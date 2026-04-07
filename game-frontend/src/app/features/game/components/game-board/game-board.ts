import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Stores
import { GameStore } from '../../../../store/game/game.store';
import { LeaderboardStore } from '../../../../store/leaderboard/leaderboard.store';

// Enums
import { GameStatus, BetType } from '../../../../core/enums/game.enums';

// Components
import { HandDisplay } from '../hand-display/hand-display';
import { BettingControls } from '../betting-controls/betting-controls';
import { DeckStatus } from '../deck-status/deck-status';
import { MarketTracker } from '../market-tracker/market-tracker';
import { HandHistory } from '../hand-history/hand-history';
import { GameOver } from '../game-over/game-over';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    CommonModule, 
    HandDisplay, 
    BettingControls, 
    DeckStatus, 
    MarketTracker, 
    HandHistory, 
    GameOver
  ],
  template: `
    <div class="board-layout">
      <!-- Left Sidebar: Status & Market -->
      <aside class="sidebar left-sidebar">
        <app-market-tracker [tileValueMap]="gameStore.tileValueMap()"></app-market-tracker>
        
        <div class="spacer"></div>
        
        <app-deck-status 
          [drawCount]="gameStore.drawPileCount()"
          [discardCount]="gameStore.discardPileCount()"
          [reshuffleCount]="gameStore.reshuffleCount()">
        </app-deck-status>
      </aside>

      <!-- Center: Main Play Area -->
      <main class="play-area">
        <app-hand-display [hand]="gameStore.activeHand()"></app-hand-display>
        
        <app-betting-controls 
          [disabled]="gameStore.isGameOver() || isResolving"
          (bet)="onBet($event)">
        </app-betting-controls>
      </main>

      <!-- Right Sidebar: History -->
      <aside class="sidebar right-sidebar">
        <app-hand-history [history]="gameStore.roundHistory()"></app-hand-history>
      </aside>

      <!-- Full Screen Overlay -->
      <app-game-over 
        *ngIf="gameStore.isGameOver()"
        [score]="gameStore.score()"
        [reason]="gameStore.gameOverReason()"
        (submitScore)="onSubmitScore($event)"
        (playAgain)="onPlayAgain()"
        (goHome)="onGoHome()">
      </app-game-over>
    </div>
  `,
  styles: [`
    .board-layout {
      display: grid;
      grid-template-columns: 300px 1fr 350px;
      gap: 2rem;
      height: 100%;
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .play-area {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 3rem;
      background: rgba(255, 255, 255, 0.02);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.05);
      padding: 3rem;
    }

    .spacer {
      flex: 1;
    }

    @media (max-width: 1200px) {
      .board-layout {
        grid-template-columns: 250px 1fr 250px;
      }
    }

    @media (max-width: 900px) {
      .board-layout {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto auto;
      }
    }
  `]
})
export class GameBoard implements OnInit {
  readonly gameStore = inject(GameStore);
  readonly leaderboardStore = inject(LeaderboardStore);
  readonly router = inject(Router);

  get isResolving(): boolean {
    return this.gameStore.status() !== GameStatus.Playing;
  }

  ngOnInit() {
    this.gameStore.startNewGame();
  }

  onBet(betType: BetType) {
    this.gameStore.makeBet(betType);
  }

  onSubmitScore(playerName: string) {
    this.leaderboardStore.addScore({
      playerName,
      score: this.gameStore.score(),
      date: new Date().toISOString(),
      roundsPlayed: this.gameStore.roundHistory().length
    });
    this.router.navigate(['/']);
  }

  onPlayAgain() {
    this.gameStore.startNewGame();
  }

  onGoHome() {
    this.router.navigate(['/']);
  }
}
