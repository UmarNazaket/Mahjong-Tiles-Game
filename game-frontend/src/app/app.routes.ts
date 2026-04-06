import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/game-layout/game-layout').then(m => m.GameLayout),
        children: [
            {
                path: '',
                loadChildren: () => import('./features/landing/landing.routes').then(m => m.LANDING_ROUTES)
            },
            {
                path: 'game',
                loadChildren: () => import('./features/game/game.routes').then(m => m.GAME_ROUTES)
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
