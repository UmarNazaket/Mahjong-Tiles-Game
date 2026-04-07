import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hand } from '../../../../core/models/game.model';
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
        <app-tile *ngFor="let tile of hand.tiles" [tile]="tile"></app-tile>
      </div>
    </div>
  `,
  styles: [`
    .hand-display {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.03);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .total-value-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(0, 0, 0, 0.3);
      padding: 0.5rem 1.5rem;
      border-radius: 20px;
    }
    .value-label {
      color: #aaa;
      font-size: 1.1rem;
    }
    .total-value {
      font-size: 2.5rem;
      font-weight: 800;
      color: #f1c40f;
      text-shadow: 0 0 10px rgba(241, 196, 15, 0.3);
    }
    .tiles-container {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  `]
})
export class HandDisplay {
  @Input() hand: Hand | null = null;
}

