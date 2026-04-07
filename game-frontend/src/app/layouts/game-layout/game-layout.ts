import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../shared/components/header/header';

@Component({
  selector: 'app-game-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Header],
  template: `
    <div class="layout-wrapper">
      <app-header></app-header>
      <main class="content-area">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .layout-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: radial-gradient(circle at top, #1e1e1e 0%, #0d0d0d 100%);
    }
    .content-area {
      flex: 1;
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
      width: 100%;
    }
  `]
})
export class GameLayout {}
