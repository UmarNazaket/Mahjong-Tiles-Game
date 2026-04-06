/**
 * Represents the overall status of the Mahjong betting game.
 */
export enum GameStatus {
  Idle = 'IDLE',
  Playing = 'PLAYING',
  GameOver = 'GAME_OVER'
}

/**
 * Represents the type of bet a user can make.
 */
export enum BetType {
  Higher = 'HIGHER',
  Lower = 'LOWER'
}

/**
 * Main categories of Mahjong tiles.
 */
export enum TileCategory {
  Number = 'NUMBER',
  Wind = 'WIND',
  Dragon = 'DRAGON'
}

/**
 * Suits for Number tiles.
 */
export enum TileSuit {
  Bamboo = 'BAMBOO',
  Circle = 'CIRCLE',
  Character = 'CHARACTER'
}

/**
 * Types of Wind tiles.
 */
export enum WindType {
  East = 'EAST',
  South = 'SOUTH',
  West = 'WEST',
  North = 'NORTH'
}

/**
 * Types of Dragon tiles.
 */
export enum DragonType {
  Red = 'RED',
  Green = 'GREEN',
  White = 'WHITE'
}
