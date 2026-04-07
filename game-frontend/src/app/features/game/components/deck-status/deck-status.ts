import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deck-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="deck-status-container">
      <div class="stat-card">
        <div class="stat-value">{{ drawCount }}</div>
        <div class="stat-label">Draw Pile</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ discardCount }}</div>
        <div class="stat-label">Discard Pile</div>
      </div>
      <div class="stat-card reshuffle-card">
        <div class="stat-value">{{ reshuffleCount }} / 3</div>
        <div class="stat-label">Reshuffles</div>
      </div>
    </div>
  `,
  styles: [`
    .deck-status-container {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
    }
    .stat-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 1rem 1.5rem;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 100px;
      backdrop-filter: blur(5px);
    }
    .reshuffle-card {
      background: rgba(253, 203, 110, 0.1);
      border-color: rgba(253, 203, 110, 0.3);
    }
    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #fff;
    }
    .reshuffle-card .stat-value {
      color: #fdcb6e;
    }
    .stat-label {
      font-size: 0.8rem;
      color: #aaa;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 0.5rem;
    }
  `]
})
export class DeckStatus {
  @Input() drawCount: number = 0;
  @Input() discardCount: number = 0;
  @Input() reshuffleCount: number = 0;
}
