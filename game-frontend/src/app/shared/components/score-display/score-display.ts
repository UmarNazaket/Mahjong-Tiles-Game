import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { popIn } from '../../animations/game.animations';

@Component({
  selector: 'app-score-display',
  standalone: true,
  imports: [CommonModule],
  animations: [popIn],
  template: `
    <div class="score-container" [@popIn]="score">
      <span class="label">SCORE</span>
      <span class="value">{{ score }}</span>
    </div>
  `,
  styles: [`
    .score-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
      padding: 0.5rem 1.5rem;
      border-radius: 12px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    .label {
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 0.1rem;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 2px;
    }
    .value {
      font-size: 1.8rem;
      font-weight: 800;
      color: #00d2ff;
      text-shadow: 0 0 15px rgba(0, 210, 255, 0.3);
      font-family: 'Outfit', sans-serif;
    }
  `]
})
export class ScoreDisplay {
  @Input() score: number = 0;
}
