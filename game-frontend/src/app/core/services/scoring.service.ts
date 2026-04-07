import { Injectable, Inject } from '@angular/core';
import { GAME_CONFIG, GameConfig } from '../config/game.config';
import { Tile } from '../models/tile.model';
import { BetType, TileCategory } from '../enums/game.enums';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {
  constructor(@Inject(GAME_CONFIG) private config: GameConfig) {}

  /**
   * Calculates the total value of a hand.
   * If a tileValueMap is provided, it uses the market prices for non-number tiles.
   */
  calculateHandValue(hand: Tile[], tileValueMap?: Map<string, number>): number {
    return hand.reduce((total, tile) => {
      let val = tile.currentValue;
      if (tileValueMap && tile.category !== TileCategory.Number) {
        val = tileValueMap.get(tile.name) ?? tile.currentValue;
      }
      return total + val;
    }, 0);
  }

  /**
   * Evaluates if the current hand value matches the player's bet relative to the previous hand.
   */
  evaluateBet(previousValue: number, currentValue: number, betType: BetType): boolean {
    if (currentValue === previousValue) {
      return false; // Tie is a loss
    }
    
    return betType === BetType.Higher 
      ? currentValue > previousValue 
      : currentValue < previousValue;
  }

  /**
   * Updates the global market values for non-number tiles based on win/loss.
   * Only tiles present in the hand have their market price shifted.
   */
  updateMarketValues(hand: Tile[], won: boolean, currentMap: Map<string, number>): Map<string, number> {
    const newMap = new Map(currentMap);
    const delta = won ? 1 : -1;

    hand.forEach(tile => {
      if (tile.category !== TileCategory.Number) {
        const currentValue = newMap.get(tile.name) ?? this.config.nonNumberBaseValue;
        newMap.set(tile.name, currentValue + delta);
      }
    });

    return newMap;
  }

  /**
   * Helper to sync an array of tiles with the current market map values.
   */
  syncTileValues(tiles: Tile[], tileValueMap: Map<string, number>): Tile[] {
    return tiles.map(tile => {
      if (tile.category === TileCategory.Number) return { ...tile };
      return {
        ...tile,
        currentValue: tileValueMap.get(tile.name) ?? tile.currentValue
      };
    });
  }

  /**
   * Validates if any game-over conditions are met.
   */
  checkGameOver(tileValueMap: Map<string, number>, reshuffleCount: number): { isOver: boolean, reason?: string } {
    if (reshuffleCount >= this.config.maxReshuffles) {
      return { isOver: true, reason: 'Deck exhausted after 3 reshuffles.' };
    }

    for (const [tileName, value] of tileValueMap.entries()) {
      if (value <= this.config.tileValueMin) {
        return { isOver: true, reason: `${tileName} value reached 0 at market.` };
      }
      if (value >= this.config.tileValueMax) {
        return { isOver: true, reason: `${tileName} value reached 10 at market.` };
      }
    }

    return { isOver: false };
  }
}
