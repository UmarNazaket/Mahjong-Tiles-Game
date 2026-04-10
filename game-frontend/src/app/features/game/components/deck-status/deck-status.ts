import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEFAULT_GAME_CONFIG } from '../../../../core/config/game.config';

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
        <div class="stat-value">{{ reshuffleCount }} / {{ maxReshuffles }}</div>
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
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-color);
      padding: 1.25rem 2rem;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 120px;
      box-shadow: var(--card-shadow);
      transition: transform 0.2s;
    }
    .stat-card:hover {
      transform: translateY(-2px);
    }
    .reshuffle-card {
      background: rgba(255, 179, 0, 0.05);
      border-color: rgba(255, 179, 0, 0.2);
    }
    .stat-value {
      font-size: 2rem;
      font-weight: 900;
      color: var(--text-color);
      line-height: 1;
    }
    .reshuffle-card .stat-value {
      color: var(--accent-color);
    }
    .stat-label {
      font-size: 0.65rem;
      color: var(--secondary-color);
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 1.5px;
      margin-top: 0.5rem;
    }

    @media (max-width: 768px) {
      .deck-status-container {
        gap: 0.5rem;
        flex-wrap: wrap;
      }
      .stat-card {
        padding: 0.75rem 1rem;
        min-width: 90px;
        flex: 1;
      }
      .stat-value {
        font-size: 1.4rem;
      }
      .stat-label {
        font-size: 0.5rem;
        letter-spacing: 1px;
        margin-top: 0.25rem;
      }
    }
  `]
})
export class DeckStatus {
  @Input() drawCount: number = 0;
  @Input() discardCount: number = 0;
  @Input() reshuffleCount: number = 0;
  
  maxReshuffles = DEFAULT_GAME_CONFIG.maxReshuffles;
}
