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
      <h3 class="history-title">Round History</h3>
      
      <div *ngIf="history.length === 0" class="empty-state">
        No hands played yet.
      </div>

      <div class="history-list">
        <div class="history-item" *ngFor="let result of history; let i = index" [@slideIn]>
          <div class="item-header">
            <span class="round-num">Round {{ history.length - i }}</span>
            <div class="result-badge" [class.won]="result.won" [class.lost]="!result.won">
              {{ result.won ? 'Won' : 'Lost' }} ({{ result.betType }})
            </div>
          </div>
          
          <div class="tiles-mini">
            <app-tile *ngFor="let tile of result.hand.tiles" [tile]="tile" [compact]="true" [hideArrows]="true"></app-tile>
          </div>
          
          <div class="item-footer">
            Value: <strong>{{ result.currentHandValue }}</strong>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .history-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .history-title {
      padding: 1.5rem;
      margin: 0;
      font-size: 1.25rem;
      color: #fff;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.3);
    }
    .empty-state {
      padding: 2rem;
      text-align: center;
      color: #777;
      font-style: italic;
    }
    .history-list {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .history-item {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 12px;
      padding: 1rem;
      border-left: 4px solid #555;
    }
    .history-item:hover {
      background: rgba(255, 255, 255, 0.05);
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .round-num {
      color: #aaa;
      font-size: 0.9rem;
    }
    .result-badge {
      font-size: 0.75rem;
      font-weight: bold;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .result-badge.won {
      background: rgba(16, 172, 132, 0.2);
      color: #10ac84;
    }
    .result-badge.lost {
      background: rgba(238, 82, 83, 0.2);
      color: #ee5253;
    }
    .tiles-mini {
      display: flex;
      gap: 0.25rem;
      flex-wrap: wrap;
      margin-bottom: 0.75rem;
    }
    .item-footer {
      text-align: right;
      font-size: 0.9rem;
      color: #ccc;
    }
    .item-footer strong {
      color: #fff;
      font-size: 1.1rem;
    }
  `]
})
export class HandHistory {
  @Input() history: RoundResult[] = [];
}
