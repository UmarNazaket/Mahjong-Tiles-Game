import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deck-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="deck-status-container">
      <div class="stat-box">
        <span class="label">DRAW PILE</span>
        <span class="value">{{ drawCount }}</span>
      </div>
      <div class="divider"></div>
      <div class="stat-box">
        <span class="label">DISCARD PILE</span>
        <span class="value">{{ discardCount }}</span>
      </div>
      <div class="divider"></div>
      <div class="stat-box">
        <span class="label">RESHUFFLES</span>
        <span class="value">{{ reshuffleCount }} / 3</span>
      </div>
    </div>
  `,
  styles: [`
    .deck-status-container {
      display: inline-flex;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 0.5rem 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    .stat-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem 1rem;
    }
    .divider {
      width: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 0.5rem 0;
    }
    .label {
      font-size: 0.6rem;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.5);
      letter-spacing: 1px;
      margin-bottom: 4px;
      text-transform: uppercase;
    }
    .value {
      font-size: 1.2rem;
      font-weight: 800;
      color: white;
      font-family: 'Outfit', sans-serif;
    }
  `]
})
export class DeckStatus {
  @Input() drawCount: number = 0;
  @Input() discardCount: number = 0;
  @Input() reshuffleCount: number = 0;
}
