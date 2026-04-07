import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameStore } from '../../../store/game/game.store';
import { ScoreDisplay } from '../score-display/score-display';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ScoreDisplay],
  template: `
    <header class="game-header">
      <div class="logo-section" (click)="exitGame()">
        <span class="exit-btn">
          <i class="exit-icon">←</i>
          EXIT
        </span>
      </div>

      <div class="stats-section">
        <app-score-display [score]="store.score()"></app-score-display>
      </div>
    </header>
  `,
  styles: [`
    .game-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: rgba(13, 13, 13, 0.8);
      backdrop-filter: blur(15px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
      height: 80px;
    }

    .exit-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.2rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 600;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .exit-btn:hover {
      background: rgba(255, 59, 48, 0.1);
      border-color: rgba(255, 59, 48, 0.3);
      color: #ff3b30;
      transform: translateX(-5px);
    }

    .exit-icon {
      font-style: normal;
      font-size: 1.2rem;
    }
  `]
})
export class Header {
  readonly store = inject(GameStore);
  private router = inject(Router);

  exitGame() {
    this.router.navigate(['/']);
  }
}
