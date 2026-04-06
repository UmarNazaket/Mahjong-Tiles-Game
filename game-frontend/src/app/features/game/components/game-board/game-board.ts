import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Empty Shell for GameBoard (Phase 1)
 */
@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-board-stub">
      <h1>GameBoard Component</h1>
      <p>Game logic and UI to be added later.</p>
    </div>
  `,
  styles: [`
    .game-board-stub {
      padding: 2rem;
      border: 2px dashed #ccc;
      text-align: center;
      margin: 2rem;
    }
  `]
})
export class GameBoard { }
