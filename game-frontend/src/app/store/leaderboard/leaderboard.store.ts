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
    clearScores() {
      leaderboardService.clearScores();
      patchState(state, { entries: [] });
    }
  }))
);
