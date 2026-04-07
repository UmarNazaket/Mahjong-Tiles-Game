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
         [class.danger]="isDangerZone"
         [@flip]="animationState">
      <div class="tile-inner">
        <div class="tile-face tile-front">

          <!-- Tile Name Label -->
          <div class="tile-name" *ngIf="!compact">{{ tile.name }}</div>

          <!-- Icon + Rank for Number tiles -->
          <div class="tile-icon" 
               [class.is-dragon]="tile.category === 'DRAGON'" 
               [class.is-wind]="tile.category === 'WIND'">
            {{ tile | tileIcon }}
          </div>

          <!-- Rank badge for number tiles -->
          <div class="tile-rank" *ngIf="tile.category === 'NUMBER' && !compact">
            {{ tile.rank }}
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
      width: 85px;
      height: 120px;
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
      transition: transform 0.6s;
      transform-style: preserve-3d;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      background: white;
      color: #333;
    }

    /* Danger zone pulsing glow */
    .tile.danger .tile-inner {
      box-shadow: 0 0 12px 3px rgba(255, 60, 60, 0.5);
      border: 2px solid #ff4444;
      animation: dangerPulse 1.5s ease-in-out infinite;
    }
    @keyframes dangerPulse {
      0%, 100% { box-shadow: 0 0 8px 2px rgba(255, 60, 60, 0.3); }
      50% { box-shadow: 0 0 16px 5px rgba(255, 60, 60, 0.6); }
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
      border-radius: 10px;
      border: 2px solid #ddd;
      padding: 4px 2px;
      overflow: hidden;
    }

    /* Tile name at top */
    .tile-name {
      font-size: 0.55rem;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
      padding: 0 2px;
    }

    .tile-icon {
      font-size: 2.25rem;
      line-height: 1;
      flex-shrink: 0;
    }
    .compact .tile-icon {
      font-size: 1.4rem;
    }
    .is-dragon { color: #d63031; }
    .is-wind { color: #0984e3; }
    
    /* Rank badge for number tiles */
    .tile-rank {
      font-size: 0.7rem;
      font-weight: 800;
      color: #555;
      background: #f0f0f0;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      line-height: 18px;
      text-align: center;
      position: absolute;
      top: 3px;
      right: 3px;
    }

    /* Value row at bottom */
    .tile-value-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      margin-bottom: 2px;
    }
    .tile-value {
      font-weight: bold;
      font-size: 1.1rem;
      background: #f1f2f6;
      border-radius: 8px;
      padding: 0 8px;
    }
    .compact .tile-value-row {
      gap: 1px;
    }
    .compact .tile-value {
      font-size: 0.7rem;
      padding: 0 4px;
    }
    .tile-value.changed {
      background: #fdf1d0;
      color: #e58e26;
      box-shadow: 0 0 5px rgba(229, 142, 38, 0.5);
    }
    .tile-value.danger-value {
      background: #ffe0e0;
      color: #d63031;
      box-shadow: 0 0 5px rgba(214, 48, 49, 0.5);
    }

    /* Change indicators */
    .change-indicator {
      font-size: 0.6rem;
      font-weight: bold;
      line-height: 1;
    }
    .compact .change-indicator {
      font-size: 0.45rem;
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
  
  animationState = 'default';
  
  get hasValueChanged(): boolean {
    return this.tile.currentValue !== this.tile.baseValue;
  }

  get valueDelta(): number {
    return this.tile.lastDelta || 0;
  }

  /** Tile is in the danger zone if its value is within 2 of a game-over threshold (0 or 10) */
  get isDangerZone(): boolean {
    if (this.tile.category === TileCategory.Number) return false;
    return this.tile.currentValue <= 2 || this.tile.currentValue >= 8;
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
