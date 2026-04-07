import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { popIn } from '../../../../shared/animations/game.animations';
import { LeaderboardStore } from '../../../../store/leaderboard/leaderboard.store';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [popIn],
  template: `
    <div class="game-over-overlay">
      <div class="game-over-modal" [@popIn]>
        <h2 class="title" [class.drama]="true">Game Over</h2>
        
        <div class="reason-container">
          <p class="reason-text">{{ formattedReason }}</p>
        </div>
        
        <div class="score-card">
          <div class="score-main">
            <span class="score-label">Final Score</span>
            <span class="score-value">{{ score }}</span>
          </div>
          <div class="rank-badge" *ngIf="potentialRank > 0 && !scoreSubmitted">
            <span *ngIf="potentialRank <= 5">Potential Rank: <span class="rank-val">#{{ potentialRank }}</span></span>
            <span *ngIf="potentialRank > 5">Not in current Top 5</span>
          </div>
          <div class="rank-badge success" *ngIf="scoreSubmitted">
            <span *ngIf="finalRank && finalRank <= 5">Final Rank: <span class="rank-val">#{{ finalRank }}</span></span>
            <span *ngIf="finalRank && finalRank > 5">Ranked outside Top 5</span>
          </div>
        </div>
        
        <div class="name-input-section" *ngIf="!scoreSubmitted">
          <label for="playerName">Your name for the leaderboard</label>
          <input 
            type="text" 
            id="playerName" 
            [(ngModel)]="playerName" 
            placeholder="e.g. Mahjong Master"
            maxlength="15"
            (keyup.enter)="onSubmitScore()"
            autocomplete="off"
          />
        </div>

        <div class="leaderboard-preview" *ngIf="scoreSubmitted">
          <p class="preview-title">Current Top Players</p>
          <div class="preview-list">
            <div class="preview-item" *ngFor="let entry of topEntries; let i = index">
              <span class="p-rank">#{{ i + 1 }}</span>
              <span class="p-name">{{ entry.playerName }}</span>
              <span class="p-score">{{ entry.score }}</span>
            </div>
          </div>
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
      position: fixed; /* Use fixed instead of absolute to cover the entire screen including header */
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999; /* Higher than header's z-index 50 */
    }
    .game-over-modal {
      background: var(--bg-card);
      backdrop-filter: blur(40px);
      border: 1px solid var(--border-color);
      border-radius: 28px;
      padding: 2rem;
      width: 90%;
      max-width: 440px;
      text-align: center;
      box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.7);
      color: var(--text-color);
      position: relative;
    }
    .title {
      font-size: 2.25rem;
      color: var(--white);
      margin: 0 0 0.5rem 0;
      text-transform: uppercase;
      font-weight: 950;
      letter-spacing: 5px;
    }
    .title.drama {
      color: #ffb300;
      text-shadow: 0 0 25px rgba(255, 179, 0, 0.3);
    }
    .reason-container {
      margin-bottom: 1.25rem;
    }
    .reason-text {
      color: var(--secondary-color);
      font-size: 0.95rem;
      font-weight: 500;
      margin: 0;
      opacity: 0.9;
    }
    .score-card {
      background: rgba(15, 23, 42, 0.4);
      padding: 1.25rem;
      border-radius: 20px;
      margin-bottom: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .score-main {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    .score-label {
      color: var(--secondary-color);
      font-size: 0.75rem;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 1.5px;
      opacity: 0.8;
    }
    .score-value {
      font-size: 3.25rem;
      font-weight: 950;
      color: var(--white);
      line-height: 1.1;
    }
    .rank-badge {
      align-self: center;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--secondary-color);
      padding: 0.4rem 0.85rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 100px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .rank-badge.success {
      background: rgba(16, 172, 132, 0.12);
      color: #10ac84;
      border-color: rgba(16, 172, 132, 0.25);
    }
    .rank-val {
      color: var(--accent-color);
      font-weight: 900;
    }
    .rank-badge.success .rank-val {
      color: #10ac84;
    }
    .name-input-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      text-align: left;
    }
    label {
      color: var(--secondary-color);
      font-size: 0.75rem;
      font-weight: 500;
      opacity: 0.7;
      padding-left: 0.25rem;
    }
    input {
      background: rgba(15, 23, 42, 0.4);
      border: 1px solid var(--border-color);
      padding: 0.9rem 1.1rem;
      border-radius: 12px;
      color: var(--white);
      font-size: 1rem;
      font-weight: 600;
      outline: none;
      transition: all 0.2s;
      width: 100%;
    }
    input::placeholder {
      color: rgba(255, 255, 255, 0.15);
    }
    input:focus {
      border-color: var(--primary-color);
      box-shadow: 0 0 0 4px rgba(110, 193, 228, 0.12);
      background: rgba(15, 23, 42, 0.6);
    }
    .leaderboard-preview {
      margin-bottom: 1.5rem;
      text-align: left;
      padding: 0 0.25rem;
    }
    .preview-title {
      font-size: 0.65rem;
      text-transform: uppercase;
      color: var(--secondary-color);
      font-weight: 800;
      letter-spacing: 1.2px;
      margin-bottom: 0.5rem;
      opacity: 0.5;
    }
    .preview-list {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .preview-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.85rem;
      padding: 0.4rem 0.6rem;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 8px;
    }
    .p-rank { font-weight: 900; color: var(--accent-color); width: 22px; }
    .p-name { flex: 1; font-weight: 600; color: var(--white); opacity: 0.85; }
    .p-score { font-weight: 800; color: var(--secondary-color); }

    .actions {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .btn {
      padding: 0.9rem;
      border: none;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-transform: uppercase;
      letter-spacing: 1.2px;
    }
    .primary-btn {
      background: linear-gradient(135deg, var(--primary-color), #4FA8CC);
      color: white;
      box-shadow: 0 8px 16px -4px rgba(110, 193, 228, 0.2);
    }
    .primary-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 12px 20px -4px rgba(110, 193, 228, 0.3);
    }
    .primary-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      filter: grayscale(1);
    }
    .secondary-btn {
      background: rgba(255, 255, 255, 0.04);
      color: var(--secondary-color);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .secondary-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--white);
    }
  `]
})
export class GameOver {
  @Input() score: number = 0;
  @Input() roundsPlayed: number = 0;
  @Input() reason: string | null = null;

  @Output() submitScore = new EventEmitter<string>();
  @Output() playAgain = new EventEmitter<void>();
  @Output() goHome = new EventEmitter<void>();

  private leaderboardStore = inject(LeaderboardStore);

  playerName: string = '';
  scoreSubmitted: boolean = false;
  potentialRank: number = 0;
  finalRank: number | null = null;

  get topEntries() {
    return this.leaderboardStore.entries().slice(0, 3);
  }

  get formattedReason(): string {
    if (!this.reason) return 'You ran out of luck!';
    // Convert to Sentence case
    const text = this.reason.toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  get reasonIcon(): string {
    if (!this.reason) return '✨';
    if (this.reason.includes('0')) return '🏮';
    if (this.reason.includes('10')) return '🔥';
    if (this.reason.includes('Wind')) return '🌬️';
    if (this.reason.includes('Dragon')) return '🐉';
    return '🎯';
  }

  ngOnInit() {
    this.potentialRank = this.leaderboardStore.getRank(this.score, this.roundsPlayed);
  }

  onSubmitScore() {
    if (this.playerName.trim() && !this.scoreSubmitted) {
      this.submitScore.emit(this.playerName.trim());
      this.scoreSubmitted = true;
      // Recalculate rank after submission to confirm final position
      this.finalRank = this.leaderboardStore.getRank(this.score, this.roundsPlayed);
    }
  }

  onPlayAgain() {
    this.playAgain.emit();
  }

  onGoHome() {
    this.goHome.emit();
  }
}
