import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fadeInOut, popIn } from '../../../../shared/animations/game.animations';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule],
  animations: [fadeInOut, popIn],
  template: `
    <div class="game-over-overlay" [@fadeInOut]>
      <div class="game-over-modal" [@popIn]>
        <h1 class="title">GAME OVER</h1>
        
        <div class="reason" *ngIf="reason">
          <span class="reason-icon">⚠️</span> {{ reason }}
        </div>
        
        <div class="score-card">
          <span class="score-label">FINAL SCORE</span>
          <span class="score-value">{{ score }}</span>
        </div>

        <div class="submission-area">
          <input 
            #nameInput 
            type="text" 
            placeholder="Enter your name..." 
            class="name-input"
            maxlength="15"
            (keyup.enter)="onSubmit(nameInput.value)"
          >
          <button 
            class="btn btn-primary" 
            (click)="onSubmit(nameInput.value)"
            [disabled]="nameInput.value.trim().length === 0"
          >
            SUBMIT SCORE
          </button>
        </div>

        <div class="actions">
          <button class="btn btn-secondary" (click)="playAgain.emit()">PLAY AGAIN</button>
          <button class="btn btn-ghost" (click)="goHome.emit()">RETURN TO HOME</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .game-over-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .game-over-modal {
      background: rgba(30, 30, 30, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 24px;
      padding: 3rem;
      width: 90%;
      max-width: 450px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }

    .title {
      font-size: 2.5rem;
      font-weight: 900;
      margin: 0;
      background: linear-gradient(135deg, #fff 0%, #a5a5a5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 4px;
    }

    .reason {
      color: #ffcc00;
      font-size: 0.9rem;
      background: rgba(255, 204, 0, 0.1);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      border: 1px solid rgba(255, 204, 0, 0.2);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .score-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(0, 0, 0, 0.3);
      padding: 1.5rem 3rem;
      border-radius: 16px;
      width: 100%;
    }

    .score-label {
      font-size: 0.8rem;
      color: rgba(255, 255, 255, 0.5);
      letter-spacing: 2px;
      margin-bottom: 0.5rem;
    }

    .score-value {
      font-size: 4rem;
      font-weight: 800;
      color: #00d2ff;
      line-height: 1;
      text-shadow: 0 0 20px rgba(0, 210, 255, 0.3);
      font-family: 'Outfit', sans-serif;
    }

    .submission-area {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .name-input {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      color: white;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .name-input:focus {
      outline: none;
      border-color: #00d2ff;
      background: rgba(0, 210, 255, 0.05);
    }

    .btn {
      width: 100%;
      padding: 1rem;
      border-radius: 12px;
      font-weight: 700;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-primary {
      background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(0, 210, 255, 0.3);
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 210, 255, 0.4);
    }

    .actions {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .btn-ghost {
      background: transparent;
      color: rgba(255, 255, 255, 0.5);
    }

    .btn-ghost:hover {
      color: white;
      background: rgba(255, 255, 255, 0.05);
    }
  `]
})
export class GameOver {
  @Input() score: number = 0;
  @Input() reason: string | null = null;
  @Output() submitScore = new EventEmitter<string>();
  @Output() playAgain = new EventEmitter<void>();
  @Output() goHome = new EventEmitter<void>();

  onSubmit(name: string) {
    if (name.trim().length > 0) {
      this.submitScore.emit(name.trim());
    }
  }
}
