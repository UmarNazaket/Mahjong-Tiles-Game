import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tile } from '../../../../core/models/tile.model';
import { TileCategory } from '../../../../core/enums/game.enums';
import { TileIconPipe } from '../../../../shared/pipes/tile-icon.pipe';
import { flipAnimation } from '../../../../shared/animations/game.animations';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule, TileIconPipe],
  animations: [flipAnimation],
  template: `
    <div class="tile" 
         [class.compact]="compact" 
         [class.danger]="isDangerZone && showHighlight"
         [@flip]="animationState">
      <div class="tile-inner">
        <div class="tile-face tile-front">

          <!-- Tile Name Label -->
          <div class="tile-name" *ngIf="!compact">{{ tile.name }}</div>

          <!-- Icon + Rank for Number tiles -->
          <div class="tile-icon" 
               [class.is-dragon]="tile.category === 'DRAGON'" 
               [class.is-wind]="tile.category === 'WIND'"
               [class.is-character]="tile.suit === 'CHARACTER'"
               [class.is-circle]="tile.suit === 'CIRCLE'"
               [class.is-bamboo]="tile.suit === 'BAMBOO'">
            {{ tile | tileIcon }}
          </div>

          <!-- Value + Change Indicator -->
          <div class="tile-value-row">
            <span class="change-indicator up" *ngIf="valueDelta > 0 && !hideArrows">▲</span>
            <span class="change-indicator down" *ngIf="valueDelta < 0 && !hideArrows">▼</span>
            <span class="tile-value" 
                  [class.changed]="hasValueChanged"
                  [class.danger-value]="isDangerZone">
              {{ tile.currentValue }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tile {
      width: 75px;
      height: 100px;
      perspective: 1000px;
      cursor: default;
    }
    .tile.compact {
      width: 42px;
      height: 58px;
    }
    .tile-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      transform-style: preserve-3d;
      border-radius: 12px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5);
      background: #ffffff;
      color: var(--text-color);
    }

    /* Danger zone pulsing glow */
    .tile.danger .tile-inner {
      box-shadow: 0 0 15px 5px rgba(238, 82, 83, 0.4);
      border: 2px solid #ee5253;
      animation: dangerPulse 2s ease-in-out infinite;
    }
    @keyframes dangerPulse {
      0%, 100% { box-shadow: 0 0 10px 2px rgba(238, 82, 83, 0.3); }
      50% { box-shadow: 0 0 20px 8px rgba(238, 82, 83, 0.5); }
    }

    .tile-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      padding: 6px 4px;
      overflow: hidden;
      background: linear-gradient(135deg, #ffffff, #f1f5f9);
    }

    /* Tile name at top */
    .tile-name {
      font-size: 0.5rem;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90%;
      padding: 0 2px;
      opacity: 0.7;
    }

    .tile-icon {
      font-size: 2.25rem;
      line-height: 1;
      flex-shrink: 0;
      color: #1e293b; /* Default dark color for better contrast on white face */
      filter: drop-shadow(0 2px 2px rgba(0,0,0,0.05));
    }
    .compact .tile-icon {
      font-size: 1.4rem;
    }
    .is-dragon { color: #d63031; }
    .is-wind { color: #0f172a; }
    .is-character { color: #334155; }
    .is-circle { color: #2e86de; }
    .is-bamboo { color: #10ac84; }
    
    /* Value row at bottom */
    .tile-value-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
      margin-bottom: 2px;
      width: 100%;
    }
    .tile-value {
      font-weight: 900;
      font-size: 0.9rem;
      background: #f1f5f9;
      color: #1e293b;
      border-radius: 4px;
      padding: 1px 6px;
      border: 1px solid rgba(0,0,0,0.05);
    }
    .compact .tile-value-row {
      gap: 1px;
    }
    .compact .tile-value {
      font-size: 0.65rem;
      padding: 0 4px;
    }
    .tile-value.changed {
      background: rgba(255, 179, 0, 0.15);
      color: #b45309;
      border-color: rgba(255, 179, 0, 0.3);
    }
    .tile-value.danger-value {
      background: #fee2e2;
      color: #b91c1c;
      border-color: #fecaca;
    }

    /* Change indicators */
    .change-indicator {
      font-size: 0.55rem;
      font-weight: 900;
      line-height: 1;
    }
    .compact .change-indicator {
      font-size: 0.4rem;
    }
    .change-indicator.up {
      color: #10ac84;
    }
    .change-indicator.down {
      color: #ee5253;
    }
  `]
})
export class TileComponent implements OnChanges {
  @Input({ required: true }) tile!: Tile;
  @Input() compact: boolean = false;
  @Input() hideArrows: boolean = false;
  @Input() showHighlight: boolean = true;

  animationState = 'default';

  get hasValueChanged(): boolean {
    return this.tile.currentValue !== this.tile.baseValue;
  }

  get valueDelta(): number {
    return this.tile.lastDelta || 0;
  }

  /** Tile is in the danger zone if it's a special tile (Wind/Dragon) AND its value is extreme (1-2 or 8-9) */
  get isDangerZone(): boolean {
    const isSpecial = this.tile.category === 'WIND' || this.tile.category === 'DRAGON';
    const isExtreme = this.tile.currentValue <= 2 || this.tile.currentValue >= 8;
    return isSpecial && isExtreme;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tile'] && !changes['tile'].isFirstChange()) {
      if (changes['tile'].previousValue?.id !== changes['tile'].currentValue?.id) {
        this.animationState = 'flipped';
        setTimeout(() => {
          this.animationState = 'default';
        }, 10);
      }
    }
  }
}
