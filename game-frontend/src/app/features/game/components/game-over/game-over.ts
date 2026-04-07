import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { popIn } from '../../../../shared/animations/game.animations';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [popIn],
  template: `
    <div class="game-over-overlay">
      <div class="game-over-modal" [@popIn]>
        <h2 class="title">Game Over</h2>
        
        <div class="reason">
          {{ reason || 'You ran out of luck!' }}
        </div>
        
        <div class="score-display">
          <span class="score-label">Final Score</span>
          <span class="score-value">{{ score }}</span>
        </div>
        
        <div class="name-input-section" *ngIf="!scoreSubmitted">
          <label for="playerName">Enter your name for the leaderboard:</label>
          <input 
            type="text" 
            id="playerName" 
            [(ngModel)]="playerName" 
            placeholder="Your Name"
            maxlength="15"
            (keyup.enter)="onSubmitScore()"
            autocomplete="off"
          />
        </div>
        
        <div class="actions">
          <button 
            *ngIf="!scoreSubmitted"
            class="btn primary-btn" 
            [disabled]="!playerName.trim()" 
            (click)="onSubmitScore()">
            Submit Score
          </button>
          
          <button *ngIf="scoreSubmitted" class="btn primary-btn" (click)="onPlayAgain()">
            Play Again
          </button>
          
          <button class="btn secondary-btn" (click)="onGoHome()">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .game-over-overlay {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    .game-over-modal {
      background: var(--bg-card);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 3rem;
      width: 90%;
      max-width: 450px;
      text-align: center;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      color: var(--text-color);
    }
    .title {
      font-size: 2rem;
      color: var(--primary-color);
      margin: 0 0 1.5rem 0;
      text-transform: uppercase;
      font-weight: 900;
      letter-spacing: 4px;
    }
    .reason {
      color: var(--secondary-color);
      margin-bottom: 2rem;
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .score-display {
      background: rgba(15, 23, 42, 0.4);
      padding: 1.5rem;
      border-radius: 16px;
      margin-bottom: 2rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .score-label {
      display: block;
      color: var(--secondary-color);
      font-size: 0.75rem;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 2px;
      margin-bottom: 0.5rem;
    }
    .score-value {
      font-size: 3.5rem;
      font-weight: 900;
      color: var(--accent-color);
      text-shadow: 0 0 20px rgba(255, 179, 0, 0.3);
    }
    .name-input-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 2rem;
      text-align: left;
    }
    label {
      color: var(--secondary-color);
      font-size: 0.75rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    input {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--border-color);
      padding: 1rem 1.25rem;
      border-radius: 12px;
      color: var(--white);
      font-size: 1.1rem;
      font-weight: 600;
      outline: none;
      transition: all 0.2s;
      width: 100%;
    }
    input::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
    input:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(110, 193, 228, 0.2);
      background: rgba(15, 23, 42, 0.8);
    }
    .actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .btn {
      padding: 1rem;
      border: none;
      border-radius: 12px;
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .primary-btn {
      background: linear-gradient(135deg, var(--primary-color), #4FA8CC);
      color: white;
      box-shadow: 0 4px 12px rgba(110, 193, 228, 0.2);
    }
    .primary-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(110, 193, 228, 0.3);
    }
    .primary-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      filter: grayscale(1);
    }
    .secondary-btn {
      background: rgba(148, 163, 184, 0.1);
      color: var(--secondary-color);
      border: 1px solid rgba(148, 163, 184, 0.2);
    }
    .secondary-btn:hover {
      background: rgba(148, 163, 184, 0.2);
      color: var(--white);
    }
  `]
})
export class GameOver {
  @Input() score: number = 0;
  @Input() reason: string | null = null;

  @Output() submitScore = new EventEmitter<string>();
  @Output() playAgain = new EventEmitter<void>();
  @Output() goHome = new EventEmitter<void>();

  playerName: string = '';
  scoreSubmitted: boolean = false;

  onSubmitScore() {
    if (this.playerName.trim() && !this.scoreSubmitted) {
      this.submitScore.emit(this.playerName.trim());
      this.scoreSubmitted = true;
    }
  }

  onPlayAgain() {
    this.playAgain.emit();
  }

  onGoHome() {
    this.goHome.emit();
  }
}
