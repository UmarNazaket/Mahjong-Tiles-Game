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
      background-color: #0f0f13;
      overflow: hidden;
      color: white;
      font-family: 'Inter', 'Outfit', sans-serif;
    }
    .main-content {
      flex: 1;
      overflow-y: auto;
      position: relative;
    }
    .no-header {
      height: 100vh;
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
