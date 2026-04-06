import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Game Over Placeholder</div>`
})
export class GameOver {
  @Input() score: number = 0;
  @Input() reason: string | null = null;
  @Output() submitScore = new EventEmitter<string>();
  @Output() playAgain = new EventEmitter<void>();
  @Output() goHome = new EventEmitter<void>();
}
