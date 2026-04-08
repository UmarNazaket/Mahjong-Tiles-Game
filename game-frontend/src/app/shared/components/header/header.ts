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
      padding: 0.75rem 2rem;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-color);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      color: var(--text-color);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .logo {
      font-size: 1.1rem;
      font-weight: 900;
      color: var(--primary-color);
      letter-spacing: -0.5px;
      text-transform: uppercase;
    }
    .score-section {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      font-weight: 700;
    }
    .label {
      color: var(--secondary-color);
      text-transform: uppercase;
      font-size: 0.65rem;
      letter-spacing: 1.5px;
    }
    .exit-btn {
      background: rgba(238, 82, 83, 0.1);
      color: #ee5253;
      border: 1px solid rgba(238, 82, 83, 0.4);
      padding: 0.5rem 1.25rem;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 800;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .exit-btn:hover {
      background: #ee5253;
      color: white;
      border-color: #ee5253;
      box-shadow: 0 4px 12px rgba(238, 82, 83, 0.3);
      transform: translateY(-1px);
    }
  `]
})
export class Header {
  @Input() score: number = 0;
  @Output() exitClicked = new EventEmitter<void>();
}
