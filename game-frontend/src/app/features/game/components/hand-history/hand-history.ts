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
        <div class="history-item" 
             *ngFor="let result of history; let i = index" 
             [class.won]="result.won" 
             [class.lost]="!result.won && result.currentHandValue !== result.previousHandValue"
             [class.tie]="result.currentHandValue === result.previousHandValue"
             [@slideIn]>
          <div class="item-header">
            <span class="round-num">Round {{ history.length - i }}</span>
            <div class="result-box">
              <span class="hand-val-badge">Value: {{ result.currentHandValue }}</span>
              <div class="result-badge" 
                   [class.won]="result.won" 
                   [class.lost]="!result.won && result.currentHandValue !== result.previousHandValue"
                   [class.tie]="result.currentHandValue === result.previousHandValue">
                {{ result.won ? 'Won' : (result.currentHandValue === result.previousHandValue ? 'Tie' : 'Lost') }} ({{ result.betType }})
              </div>
            </div>
          </div>
          
          <div class="tiles-mini">
            <app-tile *ngFor="let tile of result.hand.tiles" [tile]="tile" [compact]="true" [hideArrows]="true" [showHighlight]="false"></app-tile>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 92%;
      overflow: hidden;
    }
    .history-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid var(--border-color);
      box-shadow: var(--card-shadow);
    }
    .history-title {
      padding: 1.5rem;
      margin: 0;
      font-size: 0.85rem;
      font-weight: 800;
      color: var(--text-color);
      text-transform: uppercase;
      letter-spacing: 2px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .history-title::before {
      content: '';
      display: block;
      width: 4px;
      height: 16px;
      background: var(--primary-color);
      border-radius: 2px;
    }
    .empty-state {
      padding: 4rem 2rem;
      text-align: center;
      color: var(--secondary-color);
      font-style: italic;
      font-size: 0.9rem;
    }
    .history-list {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .history-item {
      background: rgba(15, 23, 42, 0.4);
      border-radius: 12px;
      padding: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-left: 3px solid var(--secondary-color);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .history-item.won {
      border-left-color: #10ac84;
    }
    .history-item.lost {
      border-left-color: #ee5253;
    }
    .history-item.tie {
      border-left-color: #3498db;
    }
    .history-item:hover {
      background: rgba(15, 23, 42, 0.6);
      transform: translateX(4px);
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .round-num {
      color: var(--secondary-color);
      font-size: 0.65rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .result-box {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .hand-val-badge {
      font-size: 0.6rem;
      font-weight: 900;
      background: rgba(255, 179, 0, 0.1);
      color: var(--accent-color);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .result-badge {
      font-size: 0.55rem;
      font-weight: 900;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .result-badge.won {
      background: rgba(16, 172, 132, 0.15);
      color: #10ac84;
    }
    .result-badge.lost {
      background: rgba(238, 82, 83, 0.15);
      color: #ee5253;
    }
    .result-badge.tie {
      background: rgba(52, 152, 219, 0.15);
      color: #3498db;
    }
    .tiles-mini {
      display: flex;
      gap: 0.35rem;
      flex-wrap: wrap;
    }
  `]
})
export class HandHistory {
  @Input() history: RoundResult[] = [];
}
