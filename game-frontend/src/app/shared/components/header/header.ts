import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreDisplay } from '../score-display/score-display';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ScoreDisplay],
  template: `
    <header class="game-header">
      <div class="logo">Mahjong Hand Betting</div>
      
      <div class="score-section">
        <span class="label">Score:</span>
        <app-score-display [score]="score"></app-score-display>
      </div>
      
      <button class="exit-btn" (click)="exitClicked.emit()">Exit Game</button>
    </header>
  `,
  styles: [`
    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: rgba(20, 20, 30, 0.8);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      color: white;
    }
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #e0e0e0;
      letter-spacing: 1px;
    }
    .score-section {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1.25rem;
    }
    .label {
      color: #aaa;
    }
    .exit-btn {
      background: rgba(255, 60, 60, 0.2);
      color: #ff6b6b;
      border: 1px solid #ff6b6b;
      padding: 0.5rem 1.25rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s ease;
    }
    .exit-btn:hover {
      background: rgba(255, 60, 60, 0.4);
      transform: translateY(-1px);
    }
  `]
})
export class Header {
  @Input() score: number = 0;
  @Output() exitClicked = new EventEmitter<void>();
}
