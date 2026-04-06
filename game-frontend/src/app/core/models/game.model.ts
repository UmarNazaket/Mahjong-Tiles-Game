import { Tile } from './tile.model';
import { BetType } from '../enums/game.enums';

/**
 * Represents a collection of tiles drawn for a round.
 */
export interface Hand {
  /** The tiles currently in the hand */
  tiles: Tile[];
  
  /** The total score/value of all tiles in the hand */
  totalValue: number;
}

/**
 * Represents the outcome of a single betting round.
 */
export interface RoundResult {
  /** The hand that was dealt after the bet */
  hand: Hand;
  
  /** The bet type placed (Higher or Lower) */
  betType: BetType;
  
  /** Whether the user won the bet */
  won: boolean;
  
  /** The total value of the hand that was visible when the bet was placed */
  previousHandValue: number;
  
  /** The total value of the new hand after the tiles were revealed */
  currentHandValue: number;
}
