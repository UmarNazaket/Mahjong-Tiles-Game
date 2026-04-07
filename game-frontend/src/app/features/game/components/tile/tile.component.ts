import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tile } from '../../../../core/models/tile.model';
import { TileCategory } from '../../../../core/enums/game.enums';
import { TileIconPipe } from '../../../../shared/pipes/tile-icon.pipe';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule, TileIconPipe],
  template: `
    <div class="tile-wrapper" [class.compact]="compact">
      <div class="tile-inner" [class.is-flipped]="isFlipped">
        <!-- Back of the tile -->
        <div class="tile-face tile-back">
          <div class="back-design">🀫</div>
        </div>
        
        <!-- Front of the tile -->
        <div class="tile-face tile-front">
          <div class="tile-header">
          </div>
          <div class="tile-body">
            <span class="tile-icon" [ngClass]="getSuitClass()">
              {{ (tile || null) | tileIcon }}
            </span>
          </div>
          <div class="tile-footer" *ngIf="!compact">
            <span class="name">{{ tile?.name }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tile-wrapper {
      perspective: 1000px;
      width: 100px;
      height: 140px;
      margin: 0.5rem;
      cursor: pointer;
    }

    .tile-wrapper.compact {
      width: 40px;
      height: 55px;
      margin: 0.1rem;
    }

    .tile-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      transform-style: preserve-3d;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
      border-radius: 12px;
    }

    .tile-inner.is-flipped {
      transform: rotateY(180deg);
    }

    .tile-face {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(255, 255, 255, 0.1);
      overflow: hidden;
    }

    .tile-back {
      background: linear-gradient(135deg, #1b2838 0%, #101824 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgba(255, 255, 255, 0.1);
      font-size: 3rem;
    }

    .tile-front {
      background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
      transform: rotateY(180deg);
      padding: 0.5rem;
      justify-content: space-between;
    }

    .compact .tile-front {
      padding: 2px;
      justify-content: center;
    }

    .tile-header {
      text-align: left;
      height: 15px;
    }

    .tile-body {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .tile-icon {
      font-size: 3rem;
      line-height: 1;
      color: #333;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
    }

    .compact .tile-icon {
      font-size: 1.5rem;
    }

    .tile-footer {
      text-align: center;
      height: 15px;
    }

    .name {
      font-size: 0.65rem;
      text-transform: uppercase;
      font-weight: 700;
      color: #666;
      letter-spacing: -0.5px;
    }

    /* Color Classes */
    .suit-bamboo { color: #2e7d32; }
    .suit-circle { color: #1565c0; }
    .suit-character { color: #c62828; }
    .dragon-red { color: #c62828; }
    .dragon-green { color: #2e7d32; }
  `]
})
export class TileComponent implements OnInit, OnChanges {
  @Input() tile?: Tile | null;
  @Input() compact: boolean = false;
  
  isFlipped: boolean = false;
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.triggerFlip();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tile'] && this.tile) {
      if (!changes['tile'].firstChange) {
        this.triggerFlip();
      }
    }
  }

  private triggerFlip() {
    this.isFlipped = false;
    this.cdr.detectChanges();
    
    setTimeout(() => {
      this.isFlipped = true;
      this.cdr.detectChanges();
    }, 150);
  }

  getSuitClass(): string {
    if (!this.tile) return '';
    return this.tile.category === TileCategory.Number 
      ? `suit-${this.tile.suit?.toLowerCase()}` 
      : `dragon-${this.tile.name?.toLowerCase().includes('red') ? 'red' : this.tile.name?.toLowerCase().includes('green') ? 'green' : ''}`;
  }
}
