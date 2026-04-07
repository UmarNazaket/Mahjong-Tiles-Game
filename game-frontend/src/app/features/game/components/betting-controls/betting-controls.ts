import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetType } from '../../../../core/enums/game.enums';

@Component({
  selector: 'app-betting-controls',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="betting-container">
      <h3 class="prompt-text">Next Hand Value will be...</h3>
      
      <div class="action-buttons">
        <button 
          class="bet-btn lower-btn" 
          [disabled]="disabled"
          (click)="placeBet(BetType.Lower)">
          <i class="pi pi-arrow-down icon"></i>
          <span>LOWER</span>
        </button>

        <button 
          class="bet-btn higher-btn" 
          [disabled]="disabled"
          (click)="placeBet(BetType.Higher)">
          <i class="pi pi-arrow-up icon"></i>
          <span>HIGHER</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .betting-container {
      text-align: center;
      width: 100%;
    }

    .prompt-text {
      font-size: 1.2rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 2rem;
      letter-spacing: 2px;
    }

    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 2rem;
    }

    .bet-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 100px;
      padding: 1.5rem 3rem;
      color: white;
      font-size: 1.5rem;
      font-weight: 900;
      letter-spacing: 3px;
      cursor: pointer;
      backdrop-filter: blur(10px);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      width: 250px;
    }

    .bet-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    .icon {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .higher-btn {
      border-color: rgba(76, 175, 80, 0.3);
      background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
    }

    .higher-btn:hover:not(:disabled) {
      background: linear-gradient(135deg, rgba(76, 175, 80, 0.3) 0%, rgba(76, 175, 80, 0.1) 100%);
      border-color: rgba(76, 175, 80, 0.8);
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
    }
    
    .higher-btn:hover:not(:disabled) .icon {
      color: #4caf50;
    }

    .lower-btn {
      border-color: rgba(244, 67, 54, 0.3);
      background: linear-gradient(135deg, rgba(244, 67, 54, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
    }

    .lower-btn:hover:not(:disabled) {
      background: linear-gradient(135deg, rgba(244, 67, 54, 0.3) 0%, rgba(244, 67, 54, 0.1) 100%);
      border-color: rgba(244, 67, 54, 0.8);
      transform: translateY(5px);
      box-shadow: 0 10px 30px rgba(244, 67, 54, 0.3);
    }

    .lower-btn:hover:not(:disabled) .icon {
      color: #f44336;
    }
  `]
})
export class BettingControls {
  // Expose enum to template
  readonly BetType = BetType;

  @Input() disabled: boolean = false;
  @Output() bet = new EventEmitter<BetType>();

  placeBet(type: BetType) {
    if (!this.disabled) {
      this.bet.emit(type);
    }
  }
}

