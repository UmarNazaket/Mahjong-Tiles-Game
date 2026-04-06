import { Routes } from '@angular/router';

export const GAME_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/game-board/game-board').then(m => m.GameBoard)
    }
];