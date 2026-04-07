import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Header } from '../../shared/components/header/header';
import { GameStore } from '../../store/game/game.store';

@Component({
  selector: 'app-game-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, Header],
  template: `
    <div class="layout-container">
      <app-header 
        *ngIf="isGameRoute" 
        [score]="gameStore.score()"
        (exitClicked)="onExit()">
      </app-header>
      
      <main class="main-content" [class.no-header]="!isGameRoute">
        <router-outlet></router-outlet>
      </main>
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
  `]
})
export class GameLayout {
  private router = inject(Router);
  gameStore = inject(GameStore);

  get isGameRoute(): boolean {
    return this.router.url.includes('/game');
  }

  onExit() {
    this.gameStore.resetGame();
    this.router.navigate(['/']);
  }
}
