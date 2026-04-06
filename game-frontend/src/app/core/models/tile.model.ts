import { TileCategory, TileSuit } from '../enums/game.enums';

/**
 * Represents a single Mahjong tile with its current and base values.
 */
export interface Tile {
  /** Unique identifier for the tile instance */
  id: string;
  
  /** The category of the tile (Number, Wind, or Dragon) */
  category: TileCategory;
  
  /** The suit of the tile (only for Number tiles) */
  suit?: TileSuit;
  
  /** The rank/face value of the tile (1-9 for Number tiles) */
  rank?: number;
  
  /** Readable name of the tile (e.g., "Bamboo 1", "East Wind") */
  name: string;
  
  /** The current dynamic value used for scoring and betting */
  currentValue: number;
  
  /** The starting value of the tile */
  baseValue: number;
}
