import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { LeaderboardState, initialLeaderboardState } from './leaderboard.models';
import { LeaderboardService } from '../../core/services/leaderboard.service';
import { LeaderboardEntry } from '../../core/models/leaderboard.model';
import { GAME_CONFIG } from '../../core/config/game.config';

export const LeaderboardStore = signalStore(
  { providedIn: 'root' },
  withState<LeaderboardState>(initialLeaderboardState),
  withMethods((state, leaderboardService = inject(LeaderboardService), config = inject(GAME_CONFIG)) => ({
    loadScores() {
      const topScores = leaderboardService.getTopScores(config.leaderboardSize);
      patchState(state, { entries: topScores });
    },
    addScore(entry: LeaderboardEntry) {
      leaderboardService.saveScore(entry);
      // Refresh local state
      const topScores = leaderboardService.getTopScores(config.leaderboardSize);
      patchState(state, { entries: topScores });
    }
  }))
);
