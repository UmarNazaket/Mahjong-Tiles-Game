import { signalStore, withState } from '@ngrx/signals';

export const GameStore = signalStore(
  withState({})
);
