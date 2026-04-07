import { Injectable, Inject } from '@angular/core';
import { GAME_CONFIG, GameConfig } from '../config/game.config';
import { Tile } from '../models/tile.model';
import { BetType, TileCategory } from '../enums/game.enums';

@Injectable({
  providedIn: 'root'
})
export class ScoringService {
  constructor(@Inject(GAME_CONFIG) private config: GameConfig) {}

  calculateHandValue(hand: Tile[], tileValueMap?: Map<string, number>): number {
    const syncedHand = this.syncTileValues(hand, tileValueMap || new Map());
    return syncedHand.reduce((total, tile) => total + tile.currentValue, 0);
  }

  /**
   * Returns a new array of tiles with currentValue updated from the tileValueMap
   */
  syncTileValues(hand: Tile[], tileValueMap: Map<string, number>): Tile[] {
    return hand.map(tile => {
      if (tile.category === TileCategory.Number) return { ...tile };
      
      const marketValue = tileValueMap.get(tile.name) ?? tile.baseValue;
      return {
        ...tile,
        currentValue: marketValue
      };
    });
  }

  evaluateBet(previousValue: number, currentValue: number, betType: BetType): boolean {
    if (betType === BetType.Higher) {
      return currentValue > previousValue;
    } else {
      return currentValue < previousValue;
    }
    // If equal, it's considered a loss, or you can implement a tie logic if requested, but for now we'll do strictly > or <.
  }

  // Returns the updated tileValueMap showing the new points
  applyDynamicScaling(hand: Tile[], won: boolean, tileValueMap: Map<string, number>): Map<string, number> {
    const updatedMap = new Map<string, number>(tileValueMap);
    
    // Only non-number tiles scale.
    hand.filter(t => t.category !== TileCategory.Number).forEach(tile => {
      const currentVal = updatedMap.get(tile.name) ?? tile.baseValue;
      const newVal = won ? currentVal + 1 : currentVal - 1;
      updatedMap.set(tile.name, newVal);
    });

    return updatedMap;
  }

  checkGameOver(tileValueMap: Map<string, number>, reshuffleCount: number): { isOver: boolean; reason?: string } {
    if (reshuffleCount >= this.config.maxReshuffles) {
      return { isOver: true, reason: 'Draw pile empty 3 times.' };
    }

    for (const [tileName, value] of tileValueMap.entries()) {
      if (value <= this.config.tileValueMin || value >= this.config.tileValueMax) {
        return { isOver: true, reason: `${tileName} reached a value of ${value}.` };
      }
    }

    return { isOver: false };
  }
}
