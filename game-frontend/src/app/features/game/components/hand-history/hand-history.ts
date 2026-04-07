import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundResult } from '../../../../core/models/game.model';
import { TileComponent } from '../tile/tile.component';
import { slideIn } from '../../../../shared/animations/game.animations';

@Component({
  selector: 'app-hand-history',
  standalone: true,
  imports: [CommonModule, TileComponent],
  animations: [slideIn],
  template: `
    <div class="history-container">
      <h3 class="history-title">ROUND HISTORY</h3>
      <div class="history-list">
        <div *ngIf="history.length === 0" class="empty-state">
          No rounds played yet.
        </div>
        
        <div class="history-item" *ngFor="let round of history; let i = index" [@slideIn]>
          <div class="result-badge" [class.won]="round.won" [class.lost]="!round.won">
            <span class="badge-text">{{ round.won ? 'WIN' : 'LOSS' }}</span>
          </div>
          
          <div class="hand-details">
            <div class="tiles-mini">
              @for (tile of round.hand.tiles; track tile.id) {
                <app-tile [tile]="tile" [compact]="true"></app-tile>
              }
            </div>
            <div class="round-stats">
              <span class="stat">Bet: <strong>{{ round.betType }}</strong></span>
              <span class="divider">•</span>
              <span class="stat">New Value: <strong>{{ round.currentHandValue }}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .history-container {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      max-height: 400px;
      display: flex;
      flex-direction: column;
    }
    
    .history-title {
      margin: 0 0 1rem 0;
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 2px;
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
    }

    .history-list {
      overflow-y: auto;
      padding-right: 0.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* Custom Scrollbar */
    .history-list::-webkit-scrollbar { width: 4px; }
    .history-list::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 4px; }

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: rgba(255, 255, 255, 0.3);
      font-style: italic;
    }

    .history-item {
      display: flex;
      gap: 1rem;
      background: rgba(0, 0, 0, 0.2);
      padding: 0.8rem;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .result-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4px; /* We act as a colored side-border mostly, but with text for now */
      padding: 0 0.8rem;
      border-radius: 6px;
    }

    .result-badge.won { background: rgba(0, 210, 255, 0.15); color: #00d2ff; }
    .result-badge.lost { background: rgba(255, 59, 48, 0.15); color: #ff3b30; }

    .badge-text {
      writing-mode: vertical-rl;
      text-orientation: mixed;
      font-size: 0.65rem;
      font-weight: 800;
      letter-spacing: 1px;
    }

    .hand-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .tiles-mini {
      display: flex;
      gap: 4px;
    }

    .round-stats {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
    }

    .round-stats strong {
      color: rgba(255, 255, 255, 0.9);
    }

    .divider {
      color: rgba(255, 255, 255, 0.2);
    }
  `]
})
export class HandHistory {
  @Input() history: RoundResult[] = [];
}
