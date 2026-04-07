import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { popIn } from '../../animations/game.animations';

@Component({
  selector: 'app-score-display',
  standalone: true,
  imports: [CommonModule],
  animations: [popIn],
  template: `
    <div class="score-container" [@popIn]="animationState">
      {{ score }}
    </div>
  `,
  styles: [`
    .score-container {
      font-weight: 800;
      color: var(--accent-color);
      background: rgba(255, 179, 0, 0.1);
      padding: 0.25rem 0.75rem;
      border-radius: 8px;
      min-width: 3rem;
      text-align: center;
      border: 1px solid rgba(255, 179, 0, 0.3);
    }
  `]
})
export class ScoreDisplay implements OnChanges {
  @Input() score: number = 0;
  animationState: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['score'] && !changes['score'].isFirstChange()) {
      if (changes['score'].currentValue !== changes['score'].previousValue) {
        // Increment state to trigger animation
        this.animationState++;
      }
    }
  }
}
