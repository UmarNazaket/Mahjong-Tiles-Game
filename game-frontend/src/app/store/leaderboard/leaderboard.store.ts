import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { LeaderboardState, initialLeaderboardState } from './leaderboard.models';
import { LeaderboardService } from '../../core/services/leaderboard.service';
import { LeaderboardEntry } from '../../core/models/leaderboard.model';

export const LeaderboardStore = signalStore(
  { providedIn: 'root' },
  withState<LeaderboardState>(initialLeaderboardState),
  withMethods((state, leaderboardService = inject(LeaderboardService)) => ({
    loadScores() {
      const entries = leaderboardService.getTopScores();
      patchState(state, { entries });
    },
    addScore(entry: LeaderboardEntry) {
      const entries = leaderboardService.saveScore(entry);
      patchState(state, { entries });
    },
    getRank(score: number, roundsPlayed: number): number {
      const entries = leaderboardService.getTopScores();
      // Find where this result would land.
      // 1. Current score > entry score
      // 2. Current score == entry score AND current rounds >= entry rounds (pro-user tie-breaker)
      const rank = entries.findIndex(e => 
        score > e.score || (score === e.score && roundsPlayed >= e.roundsPlayed)
      );
      return rank === -1 ? entries.length + 1 : rank + 1;
    },
    clearScores() {
      leaderboardService.clearScores();
      patchState(state, { entries: [] });
    }
  }))
);
