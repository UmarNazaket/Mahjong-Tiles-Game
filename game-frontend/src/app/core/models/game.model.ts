import { Tile } from './tile.model';
import { BetType } from '../enums/game.enums';

export interface Hand {
  tiles: Tile[];
  totalValue: number;
}

export interface RoundResult {
  hand: Hand;
  betType: BetType;
  won: boolean;
  previousHandValue: number;
  currentHandValue: number;
}
