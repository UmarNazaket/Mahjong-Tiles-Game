import { InjectionToken } from '@angular/core';

export interface GameConfig {
  handSize: number;
  nonNumberBaseValue: number;
  tileValueMin: number;
  tileValueMax: number;
  maxReshuffles: number;
  leaderboardSize: number;
}

export const DEFAULT_GAME_CONFIG: GameConfig = {
  handSize: 5,
  nonNumberBaseValue: 5,
  tileValueMin: 0,
  tileValueMax: 10,
  maxReshuffles: 3,
  leaderboardSize: 5
};

export const GAME_CONFIG = new InjectionToken<GameConfig>('Game configuration', {
  providedIn: 'root',
  factory: () => DEFAULT_GAME_CONFIG
});
