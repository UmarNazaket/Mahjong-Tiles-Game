import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetType } from '../../../../core/enums/game.enums';

@Component({
  selector: 'app-betting-controls',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="betting-controls">
      <h3>What will the next hand be?</h3>
      <div class="buttons">
        <button [disabled]="disabled" class="btn higher-btn" (click)="onBet('HIGHER')">
          <span class="icon">📈</span>
          <span class="text">Higher</span>
        </button>
        <button [disabled]="disabled" class="btn lower-btn" (click)="onBet('LOWER')">
          <span class="icon">📉</span>
          <span class="text">Lower</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .betting-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      padding: 1.5rem;
    }
    h3 {
      color: white;
      margin: 0;
      font-weight: 500;
      letter-spacing: 1px;
    }
    .buttons {
      display: flex;
      gap: 2rem;
    }
    .btn {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 2.5rem;
      border: none;
      border-radius: 50px;
      font-size: 1.25rem;
      font-weight: bold;
      color: white;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      background: #2f3542;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }
    .btn:hover:not(:disabled) {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    }
    .btn:active:not(:disabled) {
      transform: translateY(2px) scale(0.95);
    }
    .higher-btn {
      background: linear-gradient(135deg, #10ac84, #1dd1a1);
    }
    .lower-btn {
      background: linear-gradient(135deg, #ee5253, #ff6b6b);
    }
    .icon {
      font-size: 1.5rem;
    }
  `]
})
export class BettingControls {
  @Input() disabled: boolean = false;
  @Output() bet = new EventEmitter<BetType>();

  onBet(type: string) {
    this.bet.emit(type as BetType);
  }
}
