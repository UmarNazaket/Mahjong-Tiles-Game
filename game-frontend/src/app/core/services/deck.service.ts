import { Injectable, Inject } from '@angular/core';
import { GAME_CONFIG, GameConfig } from '../config/game.config';
import { Tile } from '../models/tile.model';
import { TileCategory, TileSuit, WindType, DragonType } from '../enums/game.enums';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  constructor(@Inject(GAME_CONFIG) private config: GameConfig) { }

  generateFullDeck(): Tile[] {
    const deck: Tile[] = [];
    let idCounter = 1;

    // Generate Number Tiles (3 suits, 1-9 ranks, 4 copies each)
    const suits = [TileSuit.Bamboo, TileSuit.Circle, TileSuit.Character];
    for (const suit of suits) {
      for (let rank = 1; rank <= 9; rank++) {
        for (let i = 0; i < 4; i++) {
          deck.push({
            id: `tile_${idCounter++}`,
            category: TileCategory.Number,
            suit,
            rank,
            name: `${suit} ${rank}`,
            currentValue: rank,
            baseValue: rank
          });
        }
      }
    }

    // Generate Wind Tiles (4 winds, 4 copies each)
    const winds = [WindType.East, WindType.South, WindType.West, WindType.North];
    for (const wind of winds) {
      for (let i = 0; i < 4; i++) {
        deck.push({
          id: `tile_${idCounter++}`,
          category: TileCategory.Wind,
          name: `${wind} Wind`,
          currentValue: this.config.nonNumberBaseValue,
          baseValue: this.config.nonNumberBaseValue
        });
      }
    }

    // Generate Dragon Tiles (3 dragons, 4 copies each)
    const dragons = [DragonType.Red, DragonType.Green, DragonType.White];
    for (const dragon of dragons) {
      for (let i = 0; i < 4; i++) {
        deck.push({
          id: `tile_${idCounter++}`,
          category: TileCategory.Dragon,
          name: `${dragon} Dragon`,
          currentValue: this.config.nonNumberBaseValue,
          baseValue: this.config.nonNumberBaseValue
        });
      }
    }

    return deck;
  }

  // Fisher-Yates shuffle algorithm
  shuffle(tiles: Tile[]): Tile[] {
    const shuffled = [...tiles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  drawHand(drawPile: Tile[], count: number = this.config.handSize): { hand: Tile[], remaining: Tile[] } {
    if (drawPile.length < count) {
      throw new Error(`Cannot draw ${count} tiles, only ${drawPile.length} left.`);
    }
    const drawn = drawPile.slice(0, count);
    const remaining = drawPile.slice(count);
    return { hand: drawn, remaining };
  }

  reshuffleWithFreshDeck(discardPile: Tile[]): Tile[] {
    // 1. Generate a new deck
    const newDeck = this.generateFullDeck();
    
    // 2. Give the new tiles unique IDs to avoid Angular DOM conflicts
    const timestamp = Date.now();
    const uniqueNewDeck = newDeck.map(tile => ({
      ...tile,
      id: `${tile.id}_refreshed_${timestamp}`
    }));

    // 3. Combine with Discard Pile as per requirements
    const combined = [...uniqueNewDeck, ...discardPile];
    
    // 4. Return shuffled
    return this.shuffle(combined);
  }
}
