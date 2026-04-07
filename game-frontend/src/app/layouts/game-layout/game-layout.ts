import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { GameStore } from '../../store/game/game.store';
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
  gameStore = inject(GameStore);
  
  showExitModal: boolean = false;

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
    this.gameStore.resetGame();
    this.router.navigate(['/']);
  }
}
