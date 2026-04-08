import { Injectable, inject, Inject } from '@angular/core';
import { DeckService } from './deck.service';
import { ScoringService } from './scoring.service';
import { GAME_CONFIG, GameConfig } from '../config/game.config';
import { GameState } from '../../store/game/game.models';
import { GameStatus, BetType, TileCategory } from '../enums/game.enums';
import { Hand, RoundResult } from '../models/game.model';
import { Tile } from '../models/tile.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private deckService = inject(DeckService);
  private scoringService = inject(ScoringService);
  private config = inject(GAME_CONFIG);

  initializeGame(): GameState {
    const fullDeck = this.deckService.generateFullDeck();
    const shuffledDeck = this.deckService.shuffle(fullDeck);

    // Draw initial hand
    const { hand, remaining } = this.deckService.drawHand(shuffledDeck);

    // Initialize tile value map
    const tileValueMap = new Map<string, number>();

    const syncedHand = this.scoringService.syncTileValues(hand, tileValueMap);

    const activeHand: Hand = {
      tiles: syncedHand,
      totalValue: this.scoringService.calculateHandValue(syncedHand, tileValueMap)
    };

    return {
      status: GameStatus.Playing,
      drawPile: remaining,
      discardPile: [],
      activeHand,
      previousHand: null,
      roundHistory: [],
      score: 0,
      reshuffleCount: 0,
      tileValueMap,
      gameOverReason: null
    };
  }

  processBet(currentState: GameState, betType: BetType): GameState {
    if (currentState.status !== GameStatus.Playing || !currentState.activeHand) {
      return currentState; // Should not happen
    }

    const previousHand = currentState.activeHand;
    let newDiscardPile = [...currentState.discardPile, ...previousHand.tiles];
    let newDrawPile = [...currentState.drawPile];
    let reshuffleCount = currentState.reshuffleCount;

    // Reshuffle if not enough tiles
    if (newDrawPile.length < this.config.handSize) {
      newDrawPile = this.deckService.reshuffleWithFreshDeck([...newDrawPile, ...newDiscardPile]);
      newDiscardPile = [];
      reshuffleCount++;
    }

    const { hand: rawDrawnTiles, remaining } = this.deckService.drawHand(newDrawPile);
    newDrawPile = remaining;

    // SYNC drawn tiles with current market prices BEFORE calculating win/loss
    const newTiles = this.scoringService.syncTileValues(rawDrawnTiles, currentState.tileValueMap);

    const currentHandValue = this.scoringService.calculateHandValue(newTiles, currentState.tileValueMap);
    const newHand: Hand = {
      tiles: newTiles,
      totalValue: currentHandValue
    };

    const won = this.scoringService.evaluateBet(previousHand.totalValue, currentHandValue, betType);

    const roundResult: RoundResult = {
      hand: previousHand,
      betType,
      won,
      previousHandValue: previousHand.totalValue,
      currentHandValue
    };

    const newScore = won ? currentState.score + 1 : currentState.score;

    const newTileValueMap = this.scoringService.applyDynamicScaling(previousHand.tiles, won, currentState.tileValueMap);

    // SYNC tiles one last time with the NEW scaled prices for the next round
    const finalHandTiles = newTiles.map(tile => {
      if (tile.category === TileCategory.Number) return tile;
      const newVal = newTileValueMap.get(tile.name) ?? tile.currentValue;
      return {
        ...tile,
        currentValue: newVal,
        lastDelta: newVal - tile.currentValue
      };
    });
    newHand.tiles = finalHandTiles;
    newHand.totalValue = this.scoringService.calculateHandValue(finalHandTiles, newTileValueMap);

    const gameOverCheck = this.scoringService.checkGameOver(newTileValueMap, reshuffleCount);

    return {
      status: gameOverCheck.isOver ? GameStatus.GameOver : GameStatus.Playing,
      drawPile: newDrawPile,
      discardPile: newDiscardPile,
      activeHand: newHand,
      previousHand,
      roundHistory: [roundResult, ...currentState.roundHistory],
      score: newScore,
      reshuffleCount,
      tileValueMap: newTileValueMap,
      gameOverReason: gameOverCheck.reason || null
    };
  }
}
