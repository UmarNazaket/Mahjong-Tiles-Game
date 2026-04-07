import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hand } from '../../../../core/models/game.model';
import { TileComponent } from '../tile/tile.component';
import { popIn, staggerList } from '../../../../shared/animations/game.animations';

@Component({
  selector: 'app-hand-display',
  standalone: true,
  imports: [CommonModule, TileComponent],
  animations: [popIn, staggerList],
  template: `
    <div class="hand-container" *ngIf="hand" [@popIn]>
      
      <div class="hand-header">
        <h3 class="label">ACTIVE HAND</h3>
        <div class="total-value">
          <span class="value-text">TOTAL VALUE</span>
          <span class="value-number">{{ hand.totalValue }}</span>
        </div>
      </div>

      <div class="tiles-wrapper" [@staggerList]="hand.tiles.length">
        <app-tile 
          *ngFor="let tile of hand.tiles" 
          [tile]="tile"
          [compact]="false">
        </app-tile>
      </div>

    </div>
  `,
  styles: [`
    .hand-container {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 24px;
      padding: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 800px;
    }

    .hand-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .label {
      font-size: 1rem;
      font-weight: 800;
      color: rgba(255, 255, 255, 0.6);
      letter-spacing: 3px;
      margin: 0;
    }

    .total-value {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(0, 210, 255, 0.1);
      padding: 0.5rem 1.5rem;
      border-radius: 50px;
      border: 1px solid rgba(0, 210, 255, 0.3);
    }

    .value-text {
      font-size: 0.8rem;
      font-weight: 700;
      color: #00d2ff;
      letter-spacing: 1px;
    }

    .value-number {
      font-size: 2rem;
      font-weight: 900;
      color: #fff;
      font-family: 'Outfit', sans-serif;
      text-shadow: 0 0 10px rgba(0, 210, 255, 0.5);
    }

    .tiles-wrapper {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
    }
  `]
})
export class HandDisplay {
  @Input() hand?: Hand | null;
}

