import { LeaderboardEntry } from '../../core/models/leaderboard.model';

export interface LeaderboardState {
  entries: LeaderboardEntry[];
}

export const initialLeaderboardState: LeaderboardState = {
  entries: []
};
