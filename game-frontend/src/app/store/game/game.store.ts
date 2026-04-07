import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { GameState, initialGameState } from './game.models';
import { GameService } from '../../core/services/game.service';
import { BetType, GameStatus } from '../../core/enums/game.enums';
import { SoundService } from '../../core/services/sound.service';

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState({ ...initialGameState, isProcessing: false }),
  withComputed((state) => ({
    drawPileCount: computed(() => state.drawPile().length),
    discardPileCount: computed(() => state.discardPile().length),
    isGameOver: computed(() => state.status() === GameStatus.GameOver),
    canBet: computed(() =>
      state.status() === GameStatus.Playing &&
      state.activeHand() !== null &&
      !state.isProcessing()
    )
  })),
  withMethods((state, gameService = inject(GameService), soundService = inject(SoundService)) => ({
    startNewGame() {
      const newState = gameService.initializeGame();
      patchState(state, newState);
    },
    async makeBet(betType: BetType) {
      if (state.status() !== GameStatus.Playing || state.isProcessing()) return;

      // Start processing (disables buttons immediately)
      patchState(state, { isProcessing: true } as any);

      const currentState: GameState = {
        status: state.status(),
        drawPile: state.drawPile(),
        discardPile: state.discardPile(),
        activeHand: state.activeHand(),
        previousHand: state.previousHand(),
        roundHistory: state.roundHistory(),
        score: state.score(),
        reshuffleCount: state.reshuffleCount(),
        tileValueMap: state.tileValueMap(),
        gameOverReason: state.gameOverReason()
      };

      const newState = gameService.processBet(currentState, betType);
      patchState(state, newState);

      // roundHistory is newest-first ([roundResult, ...previous]), so [0] is always the latest result
      const latestRound = newState.roundHistory[0];
      if (latestRound) {
        if (latestRound.won) {
          soundService.playDing();
        } else {
          soundService.playThud();
        }
      }

      // Add a cooldown to prevent rapid clicking and let animations breathe
      await new Promise(resolve => setTimeout(resolve, 300));

      // End processing
      patchState(state, { isProcessing: false } as any);
    },
    resetGame() {
      patchState(state, initialGameState);
    }
  }))
);
