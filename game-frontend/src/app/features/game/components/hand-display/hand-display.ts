import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hand } from '../../../../core/models/game.model';
import { Tile } from '../../../../core/models/tile.model';
import { TileComponent } from '../tile/tile.component';
import { fadeInOut } from '../../../../shared/animations/game.animations';

@Component({
  selector: 'app-hand-display',
  standalone: true,
  imports: [CommonModule, TileComponent],
  animations: [fadeInOut],
  template: `
    <div class="hand-display" *ngIf="hand" [@fadeInOut]>
      <div class="total-value-container">
        <span class="value-label">Current Hand Value:</span>
        <span class="total-value">{{ hand.totalValue }}</span>
      </div>
      <div class="tiles-container">
        <app-tile 
          *ngFor="let tile of hand.tiles; let i = index; trackBy: trackByTileId" 
          [tile]="tile"
          [delay]="i * 120"
          [animateFlip]="true">
        </app-tile>
      </div>
    </div>
  `,
  styles: [`
    .hand-display {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      border-radius: 24px;
      border: 1px solid var(--border-color);
      box-shadow: var(--card-shadow);
    }
    .total-value-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      background: rgba(15, 23, 42, 0.4);
      padding: 1.5rem 3rem;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .value-label {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .total-value {
      font-size: 2rem;
      font-weight: 900;
      color: var(--accent-color);
      line-height: 1;
      text-shadow: 0 0 20px rgba(255, 179, 0, 0.2);
    }
    .tiles-container {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 1rem;
    }
    
    @media (max-width: 768px) {
      .hand-display {
        padding: 1rem;
        border-radius: 16px;
      }
      .total-value-container {
        padding: 1rem 2rem;
      }
      .total-value {
        font-size: 1.5rem;
      }
      .tiles-container {
        gap: 0.5rem;
        margin-top: 0.5rem;
      }
    }
  `]
})
export class HandDisplay {
  @Input() hand: Hand | null = null;

  trackByTileId(index: number, tile: Tile): string {
    return tile.id;
  }
}

