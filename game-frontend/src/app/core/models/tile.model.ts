import { TileCategory, TileSuit } from '../enums/game.enums';

export interface Tile {
  id: string; // Unique ID for each physical tile instance
  category: TileCategory;
  suit?: TileSuit; // Only for Number tiles
  rank?: number; // 1-9 for Number tiles
  name: string; // E.g., "Bamboo 1", "East Wind"
  currentValue: number;
  baseValue: number;
  lastDelta?: number;
}
