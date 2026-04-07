import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GameStore } from '../../../../store/game/game.store';
import { LeaderboardStore } from '../../../../store/leaderboard/leaderboard.store';
import { BetType } from '../../../../core/enums/game.enums';

import { DeckStatus } from '../deck-status/deck-status';
import { HandDisplay } from '../hand-display/hand-display';
import { BettingControls } from '../betting-controls/betting-controls';
import { HandHistory } from '../hand-history/hand-history';
import { GameOver } from '../game-over/game-over';
import { MarketTracker } from '../market-tracker/market-tracker';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [
    CommonModule,
    DeckStatus,
    HandDisplay,
    BettingControls,
    HandHistory,
    GameOver,
    MarketTracker
  ],
  template: `
    <div class="game-container">
      
      <!-- Top Section: Deck Status & Market -->
      <div class="top-section">
        <app-market-tracker [tileValueMap]="gameStore.tileValueMap()"></app-market-tracker>
        
        <app-deck-status 
          [drawCount]="gameStore.drawPileCount()"
          [discardCount]="gameStore.discardPileCount()"
          [reshuffleCount]="gameStore.reshuffleCount()">
        </app-deck-status>
      </div>

      <div class="main-play-area">
        <!-- Center Section: Current Hand & Betting -->
        <div class="center-stage">
          <app-hand-display [hand]="gameStore.activeHand()"></app-hand-display>
          
          <div class="betting-area">
             <app-betting-controls 
                [disabled]="!gameStore.canBet()"
                (bet)="onBet($event)">
             </app-betting-controls>
          </div>
        </div>

        <!-- Right Section: History -->
        <div class="side-panel">
          <app-hand-history [history]="gameStore.roundHistory()"></app-hand-history>
        </div>
      </div>

      <!-- Game Over Modal Overlay -->
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
    .game-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 2rem 2.5rem;
      gap: 2rem;
      position: relative;
      /* Remove height: 100% to allow natural page scrolling on short viewports */
    }
    .top-section {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      gap: 2rem;
      flex: 0 0 auto;
    }
    .main-play-area {
      display: flex;
      flex-direction: row;
      gap: 2.5rem;
      position: relative;
      min-height: 0;
    }
    .center-stage {
      flex: 1.5;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start; /* Start from top to prevent pushing into market prices */
      padding-top: 2rem;
      gap: 4rem;
      min-width: 600px;
    }
    .side-panel {
      flex: 1;
      min-width: 350px;
      max-width: 450px;
      display: flex;
      flex-direction: column;
      height: calc(100vh - 300px); /* Constrain height to enable internal scroll */
      min-height: 400px;
    }
    .betting-area {
      margin-top: 1rem;
    }

    /* Vertical Responsiveness for 13-inch screens and smaller heights */
    @media (max-height: 850px) {
      .game-container {
        padding: 1.5rem;
        gap: 1.5rem;
      }
      .center-stage {
        padding-top: 1rem;
        gap: 2rem;
      }
      .main-play-area {
        gap: 1.5rem;
      }
      .side-panel {
        height: calc(100vh - 250px);
      }
    }

    @media (max-height: 700px) {
      .center-stage {
        gap: 1.5rem;
      }
      .main-play-area {
        margin-top: 0;
      }
    }

    @media (max-width: 1280px) {
      .center-stage {
        min-width: 500px;
      }
    }

    @media (max-width: 1024px) {
      .game-container {
        padding: 1rem;
        overflow: hidden;
      }
      .main-play-area {
        flex-direction: column;
        height: auto;
        overflow: hidden;
      }
      .side-panel {
        flex: none;
        height: 400px;
        max-width: 100%;
        min-width: 0;
      }
    }
  `]
})
export class GameBoard implements OnInit {
  gameStore = inject(GameStore);
  leaderboardStore = inject(LeaderboardStore);
  private router = inject(Router);

  ngOnInit() {
    // If we land here and game isn't playing, start one
    if (!this.gameStore.canBet() && !this.gameStore.isGameOver()) {
      this.gameStore.startNewGame();
    }
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
  }

  onPlayAgain() {
    this.gameStore.startNewGame();
  }

  onGoHome() {
    this.gameStore.resetGame();
    this.router.navigate(['/']);
  }
}
