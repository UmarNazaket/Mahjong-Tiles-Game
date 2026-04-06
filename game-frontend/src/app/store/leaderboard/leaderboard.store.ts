import { signalStore, withState } from '@ngrx/signals';

export const LeaderboardStore = signalStore(
  withState({ entries: [] })
);
