import { trigger, transition, style, animate, state } from '@angular/animations';

export const flipAnimation = trigger('flip', [
  state('default', style({ transform: 'rotateY(0)' })),
  state('flipped', style({ transform: 'rotateY(180deg)' })),
  transition('default => flipped', animate('400ms ease-out')),
  transition('flipped => default', animate('400ms ease-in'))
]);

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('300ms ease-out', style({ opacity: 0 }))
  ])
]);

export const popIn = trigger('popIn', [
  transition(':enter', [
    style({ transform: 'scale(0.8)', opacity: 0 }),
    animate('300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ transform: 'scale(1)', opacity: 1 }))
  ])
]);

export const slideIn = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);
