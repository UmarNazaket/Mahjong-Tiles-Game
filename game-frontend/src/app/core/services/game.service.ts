import { Injectable, inject } from '@angular/core';
import { DeckService } from './deck.service';
import { ScoringService } from './scoring.service';
import { GAME_CONFIG } from '../config/game.config';
import { GameState } from '../../store/game/game.models';
import { GameStatus, BetType } from '../enums/game.enums';
import { Hand, RoundResult } from '../models/game.model';

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

    const activeHand: Hand = {
      tiles: hand,
      totalValue: this.scoringService.calculateHandValue(hand, tileValueMap)
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
      return currentState;
    }

    const previousHand = currentState.activeHand;
    let newDiscardPile = [...currentState.discardPile, ...previousHand.tiles];
    let newDrawPile = [...currentState.drawPile];
    let reshuffleCount = currentState.reshuffleCount;

    // Reshuffle if not enough tiles
    if (newDrawPile.length < this.config.handSize) {
      newDrawPile = this.deckService.reshuffleWithFreshDeck(newDiscardPile);
      newDiscardPile = [];
      reshuffleCount++;
    }

    const { hand: newTiles, remaining } = this.deckService.drawHand(newDrawPile);
    newDrawPile = remaining;

    // Calculate value based on CURRENT market map
    const currentHandValue = this.scoringService.calculateHandValue(newTiles, currentState.tileValueMap);
    
    const won = this.scoringService.evaluateBet(previousHand.totalValue, currentHandValue, betType);
    
    // Update market prices based on win/loss
    const newTileValueMap = this.scoringService.updateMarketValues(newTiles, won, currentState.tileValueMap);
    
    // Re-sync tile objects with new market prices for the UI
    const syncedHandTiles = this.scoringService.syncTileValues(newTiles, newTileValueMap);
    
    const newHand: Hand = {
      tiles: syncedHandTiles,
      totalValue: this.scoringService.calculateHandValue(syncedHandTiles, newTileValueMap)
    };

    const roundResult: RoundResult = {
      hand: previousHand,
      betType,
      won,
      previousHandValue: previousHand.totalValue,
      currentHandValue: newHand.totalValue
    };

    const newScore = won ? currentState.score + 1 : currentState.score;
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
