import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { GameState, initialGameState } from './game.models';
import { GameService } from '../../core/services/game.service';
import { BetType, GameStatus } from '../../core/enums/game.enums';

export const GameStore = signalStore(
  { providedIn: 'root' },
  withState<GameState>(initialGameState),
  withComputed((state) => ({
    drawPileCount: computed(() => state.drawPile().length),
    discardPileCount: computed(() => state.discardPile().length),
    isGameOver: computed(() => state.status() === GameStatus.GameOver),
    canBet: computed(() => state.status() === GameStatus.Playing && state.activeHand() !== null)
  })),
  withMethods((state, gameService = inject(GameService)) => ({
    startNewGame() {
      const newState = gameService.initializeGame();
      patchState(state, newState);
    },
    makeBet(betType: BetType) {
      if (state.status() !== GameStatus.Playing) return;
      
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
    },
    resetGame() {
      patchState(state, initialGameState);
    }
  }))
);
