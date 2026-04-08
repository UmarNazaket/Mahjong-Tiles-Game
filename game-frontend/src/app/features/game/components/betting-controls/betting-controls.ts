import { Component, Output, EventEmitter, Input, HostListener } from '@angular/core';
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
          <span class="shortcut">▲</span>
        </button>
        <button [disabled]="disabled" class="btn lower-btn" (click)="onBet('LOWER')">
          <span class="icon">📉</span>
          <span class="text">Lower</span>
          <span class="shortcut">▼</span>
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
      border: 2px solid var(--primary-color);
      background: transparent;
      border-radius: 30px;
      font-size: 1.15rem;
      font-weight: 800;
      color: white;
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s;
      position: relative;
      overflow: hidden;
      z-index: 1;
    }
    
    .btn::before {
      content: '';
      position: absolute;
      top: 0; 
      left: 0; 
      width: 0%; 
      height: 100%;
      background: var(--primary-color); /* Blue color fill */
      transition: width 0.3s ease;
      z-index: -1;
    }
    
    .btn:hover:not(:disabled)::before {
      width: 100%;
    }
    
    .btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
      transform: none !important;
      filter: grayscale(1);
    }
    
    .btn:hover:not(:disabled) {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(110, 193, 228, 0.4);
    }
    
    .btn:active:not(:disabled) {
      transform: translateY(-1px);
    }
    
    .icon {
      font-size: 1.4rem;
    }
    .shortcut {
      position: absolute;
      right: 1.25rem;
      font-size: 0.6rem;
      font-weight: 900;
      opacity: 0.35;
      background: rgba(0, 0, 0, 0.2);
      padding: 0.15rem 0.35rem;
      border-radius: 4px;
      transition: opacity 0.2s;
    }
    .btn:hover:not(:disabled) .shortcut {
      opacity: 0.6;
    }

    @media (max-width: 768px) {
      .betting-controls {
        padding: 1rem;
        gap: 1rem;
      }
      .buttons {
        gap: 1rem;
      }
      .btn {
        padding: 0.75rem 2rem;
        font-size: 1rem;
      }
      .shortcut {
        right: 0.5rem;
      }
    }

    @media (max-width: 480px) {
      .buttons {
        flex-direction: column;
        width: 100%;
      }
    }
  `]
})
export class BettingControls {
  @Input() disabled: boolean = false;
  @Output() bet = new EventEmitter<BetType>();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.disabled) return;
    
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.onBet('HIGHER');
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.onBet('LOWER');
    }
  }

  onBet(type: string) {
    this.bet.emit(type as BetType);
  }
}

