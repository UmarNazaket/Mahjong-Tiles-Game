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
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
      font-weight: 700;
      letter-spacing: 1px;
      font-size: 0.85rem;
      text-transform: uppercase;
    }
    .buttons {
      display: flex;
      gap: 2rem;
    }
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 1rem 3rem;
      border: none;
      border-radius: 16px;
      font-size: 1.15rem;
      font-weight: 800;
      color: white;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      position: relative;
      overflow: hidden;
    }
    .btn::after {
      content: '';
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(rgba(255, 255, 255, 0.1), transparent);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .btn:hover::after {
      opacity: 1;
    }
    .btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      transform: none !important;
      filter: grayscale(1);
    }
    .btn:hover:not(:disabled) {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }
    .btn:active:not(:disabled) {
      transform: translateY(-1px);
    }
    .higher-btn {
      background: linear-gradient(135deg, var(--primary-color), #4FA8CC);
      box-shadow: 0 8px 20px rgba(110, 193, 228, 0.3);
    }
    .lower-btn {
      background: linear-gradient(135deg, #3d424cff, #4A5568);
      box-shadow: 0 8px 20px rgba(107, 119, 140, 0.2);
    }
    .icon {
      font-size: 1.4rem;
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

