import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { GameStore } from '../../store/game/game.store';
import { ConfettiService } from '../../core/services/confetti.service';
import { popIn, fadeInOut } from '../../shared/animations/game.animations';

@Component({
  selector: 'app-game-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, Header],
  animations: [popIn, fadeInOut],
  template: `
    <div class="layout-container">
      <app-header 
        *ngIf="isGameRoute" 
        [score]="gameStore.score()"
        (exitClicked)="onExitRequested()">
      </app-header>
      
      <main class="main-content" [class.no-header]="!isGameRoute">
        <router-outlet></router-outlet>
      </main>

      <!-- Milestone Toast Notification -->
      <div class="milestone-toast" *ngIf="showMilestoneToast()" [@popIn]>
        <button class="toast-close" (click)="dismissToast()">✕</button>
        <div class="toast-icon">🏆</div>
        <div class="toast-content">
          <div class="toast-title">Milestone Reached!</div>
          <div class="toast-message">
            Congratulations! You hit <span class="toast-score">{{ currentMilestoneScore() }}</span> points!
          </div>
          <div class="toast-sub">Keep going — the leaderboard awaits 🚀</div>
        </div>
        <div class="toast-progress-bar"></div>
      </div>

      <!-- Exit Confirmation Modal -->
      <div class="modal-overlay" *ngIf="showExitModal" [@fadeInOut]>
        <div class="exit-modal" [@popIn]>
          <div class="modal-icon">⚠️</div>
          <h2 class="modal-title">Leave Game?</h2>
          <p class="modal-text">Are you sure you want to exit? Your current game progress and score will be lost.</p>
          
          <div class="modal-actions">
            <button class="btn secondary-btn" (click)="cancelExit()">Keep Playing</button>
            <button class="btn danger-btn" (click)="confirmExit()">Yes, Exit</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: var(--bg-dark);
      overflow: hidden;
      color: var(--text-color);
      font-family: 'Inter', 'Outfit', sans-serif;
    }
    .main-content {
      flex: 1;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .no-header {
      flex: 1;
    }

    /* ── Milestone Toast ── */
    .milestone-toast {
      position: fixed;
      top: 1.25rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2000;
      min-width: 340px;
      max-width: 460px;
      background: linear-gradient(135deg,
        rgba(20, 30, 48, 0.97) 0%,
        rgba(30, 40, 60, 0.95) 100%);
      border: 1px solid rgba(255, 179, 0, 0.35);
      border-radius: 20px;
      padding: 1.25rem 1.5rem 1rem;
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      box-shadow:
        0 24px 48px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 179, 0, 0.1) inset,
        0 0 30px rgba(255, 179, 0, 0.05);
      overflow: hidden;
    }

    .toast-close {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.35);
      font-size: 0.75rem;
      cursor: pointer;
      padding: 0.25rem;
      transition: color 0.2s;
    }
    .toast-close:hover { color: rgba(255, 255, 255, 0.7); }

    .toast-icon {
      font-size: 2.2rem;
      line-height: 1;
      flex-shrink: 0;
      margin-top: 0.15rem;
      filter: drop-shadow(0 4px 8px rgba(255, 179, 0, 0.4));
    }

    .toast-content {
      flex: 1;
      min-width: 0;
    }

    .toast-title {
      font-size: 0.65rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #FFB300;
      margin-bottom: 0.25rem;
    }

    .toast-message {
      font-size: 1rem;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 0.35rem;
      line-height: 1.3;
    }

    .toast-score {
      color: #FFB300;
      font-weight: 900;
      font-size: 1.15rem;
    }

    .toast-sub {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.45);
    }

    /* Auto-dismiss progress bar */
    .toast-progress-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 100%;
      background: linear-gradient(90deg, #FFB300, #FF6B6B);
      border-radius: 0 0 20px 20px;
      animation: shrinkBar 4s linear forwards;
    }
    @keyframes shrinkBar {
      from { width: 100%; }
      to   { width: 0%; }
    }

    /* Modal Styles */
    .modal-overlay {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .exit-modal {
      background: var(--bg-card);
      backdrop-filter: blur(40px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 28px;
      padding: 2.5rem 2rem;
      width: 90%;
      max-width: 400px;
      text-align: center;
      box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px inset rgba(255, 255, 255, 0.05);
      color: var(--text-color);
    }
    .modal-icon {
      font-size: 3rem;
      margin-bottom: 0.5rem;
      filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
    }
    .modal-title {
      font-size: 1.8rem;
      color: var(--white);
      margin: 0 0 0.75rem 0;
      font-weight: 900;
      letter-spacing: 1px;
    }
    .modal-text {
      color: var(--secondary-color);
      font-size: 0.95rem;
      margin: 0 0 2rem 0;
      line-height: 1.5;
    }
    .modal-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    .btn {
      padding: 0.9rem 1.25rem;
      border: none;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      text-transform: uppercase;
      letter-spacing: 1px;
      flex: 1;
    }
    .secondary-btn {
      background: rgba(255, 255, 255, 0.05);
      color: var(--white);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .secondary-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .danger-btn {
      background: rgba(238, 82, 83, 0.15);
      color: #ff6b6b;
      border: 1px solid rgba(238, 82, 83, 0.3);
    }
    .danger-btn:hover {
      background: #ee5253;
      color: white;
      transform: translateY(-1px);
      box-shadow: 0 8px 16px -4px rgba(238, 82, 83, 0.3);
      border-color: #ee5253;
    }
  `]
})
export class GameLayout {
  private router = inject(Router);
  private confettiService = inject(ConfettiService);
  gameStore = inject(GameStore);

  showExitModal = false;
  readonly showMilestoneToast = signal(false);
  readonly currentMilestoneScore = signal(0);

  private toastDismissTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    // React to milestone events from the confetti service
    effect(() => {
      const event = this.confettiService.milestoneEvent();
      if (event) {
        this.currentMilestoneScore.set(event.score);
        this.showMilestoneToast.set(true);

        // Auto-dismiss after 4 seconds (matches the CSS progress bar animation)
        if (this.toastDismissTimer) clearTimeout(this.toastDismissTimer);
        this.toastDismissTimer = setTimeout(() => {
          this.showMilestoneToast.set(false);
        }, 4000);
      }
    });
  }

  dismissToast() {
    if (this.toastDismissTimer) clearTimeout(this.toastDismissTimer);
    this.showMilestoneToast.set(false);
  }

  get isGameRoute(): boolean {
    return this.router.url.includes('/game');
  }

  onExitRequested() {
    this.showExitModal = true;
  }

  cancelExit() {
    this.showExitModal = false;
  }

  confirmExit() {
    this.showExitModal = false;
    this.confettiService.reset();
    this.showMilestoneToast.set(false);
    this.gameStore.resetGame();
    this.router.navigate(['/']);
  }
}
