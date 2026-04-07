import { GameStatus } from '../../core/enums/game.enums';
import { Tile } from '../../core/models/tile.model';
import { Hand, RoundResult } from '../../core/models/game.model';

export interface GameState {
  status: GameStatus;
  drawPile: Tile[];
  discardPile: Tile[];
  activeHand: Hand | null;
  previousHand: Hand | null;
  roundHistory: RoundResult[];
  score: number;
  reshuffleCount: number;
  tileValueMap: Map<string, number>;
  gameOverReason: string | null;
}

export const initialGameState: GameState = {
  status: GameStatus.Idle,
  drawPile: [],
  discardPile: [],
  activeHand: null,
  previousHand: null,
  roundHistory: [],
  score: 0,
  reshuffleCount: 0,
  tileValueMap: new Map<string, number>(),
  gameOverReason: null
};
