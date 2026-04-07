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
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    .game-over-modal {
      background: #1e1e24;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 3rem;
      width: 90%;
      max-width: 450px;
      text-align: center;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      color: white;
    }
    .title {
      font-size: 2.5rem;
      color: #ee5253;
      margin: 0 0 1rem 0;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .reason {
      color: #aaa;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }
    .score-display {
      background: rgba(255, 255, 255, 0.05);
      padding: 1.5rem;
      border-radius: 16px;
      margin-bottom: 2rem;
    }
    .score-label {
      display: block;
      color: #888;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 0.5rem;
    }
    .score-value {
      font-size: 3.5rem;
      font-weight: 900;
      color: #4cd137;
    }
    .name-input-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 2rem;
      text-align: left;
    }
    label {
      color: #ccc;
      font-size: 0.9rem;
    }
    input {
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.2);
      padding: 1rem;
      border-radius: 8px;
      color: white;
      font-size: 1.1rem;
      outline: none;
      transition: border-color 0.2s;
    }
    input:focus {
      border-color: #3498db;
    }
    .actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .btn {
      padding: 1rem;
      border: none;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    .primary-btn {
      background: #3498db;
      color: white;
    }
    .primary-btn:hover:not(:disabled) {
      background: #2980b9;
      transform: translateY(-2px);
    }
    .primary-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .secondary-btn {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #ccc;
    }
    .secondary-btn:hover {
      background: rgba(255, 255, 255, 0.05);
      color: white;
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
