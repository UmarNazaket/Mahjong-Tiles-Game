import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { popIn } from '../../animations/game.animations';

@Component({
  selector: 'app-score-display',
  standalone: true,
  imports: [CommonModule],
  animations: [popIn],
  template: `
    <div class="score-container" [class.bounce-bump]="isBouncing">
      <span class="score-icon">🏆</span>
      <span class="score-label">SCORE</span>
      <span class="score-value">{{ score }}</span>
    </div>
  `,
  styles: [`
    .score-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, rgba(20, 30, 48, 0.95) 0%, rgba(30, 40, 60, 0.95) 100%);
      padding: 0.4rem 1rem;
      border-radius: 50px;
      border: 1px solid rgba(255, 179, 0, 0.5);
      box-shadow: 0 4px 15px rgba(255, 179, 0, 0.15), inset 0 0 10px rgba(255, 179, 0, 0.05); /* Soft glow */
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .score-icon {
      font-size: 1.2rem;
      filter: drop-shadow(0 2px 4px rgba(255, 179, 0, 0.4));
    }
    .score-label {
      font-size: 0.65rem;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.6);
      letter-spacing: 1px;
      margin-right: 0.25rem;
    }
    .score-value {
      font-size: 1.1rem;
      font-weight: 900;
      color: #FFB300;
      font-variant-numeric: tabular-nums;
    }

    /* CSS Keyframe for the bounce animation */
    .bounce-bump {
      animation: scoreBump 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    
    @keyframes scoreBump {
      0% { transform: scale(1); }
      40% { transform: scale(1.15); border-color: rgba(255, 179, 0, 1); box-shadow: 0 8px 25px rgba(255, 179, 0, 0.4); }
      100% { transform: scale(1); }
    }
  `]
})
export class ScoreDisplay implements OnChanges {
  @Input() score: number = 0;
  isBouncing: boolean = false;
  private bounceTimer: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['score'] && !changes['score'].isFirstChange()) {
      if (changes['score'].currentValue !== changes['score'].previousValue) {
        this.triggerBounce();
      }
    }
  }

  private triggerBounce() {
    this.isBouncing = false;
    // Force a reflow so the browser restarts the CSS animation
    setTimeout(() => {
      this.isBouncing = true;
      if (this.bounceTimer) clearTimeout(this.bounceTimer);
      this.bounceTimer = setTimeout(() => {
        this.isBouncing = false;
      }, 400); // Matches the 0.4s keyframe duration
    }, 10);
  }
}
