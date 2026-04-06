import { InjectionToken } from '@angular/core';

/**
 * Configuration interface for game rules and thresholds.
 */
export interface GameConfig {
  /** Number of tiles dealt in a single hand */
  handSize: number;
  
  /** Starting value for Wind and Dragon tiles */
  nonNumberBaseValue: number;
  
  /** Minimum value a tile can reach before game over */
  tileValueMin: number;
  
  /** Maximum value a tile can reach before game over */
  tileValueMax: number;
  
  /** Maximum number of times the draw pile can be reshuffled */
  maxReshuffles: number;
  
  /** Number of entries to display on the leaderboard */
  leaderboardSize: number;
}

/**
 * Default game configuration.
 */
export const DEFAULT_GAME_CONFIG: GameConfig = {
  handSize: 5,
  nonNumberBaseValue: 5,
  tileValueMin: 0,
  tileValueMax: 10,
  maxReshuffles: 3,
  leaderboardSize: 5
};

/**
 * Injection Token for providing the game configuration throughout the app.
 */
export const GAME_CONFIG = new InjectionToken<GameConfig>('Game configuration', {
  providedIn: 'root',
  factory: () => DEFAULT_GAME_CONFIG
});
