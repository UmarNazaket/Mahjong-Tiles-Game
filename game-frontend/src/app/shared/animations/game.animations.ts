import { animation, style, animate, trigger, transition, state, query, stagger } from '@angular/animations';

export const flipAnimation = trigger('flip', [
  state('default', style({ transform: 'rotateY(0)' })),
  state('flipped', style({ transform: 'rotateY(180deg)' })),
  transition('default => flipped', [
    animate('0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)')
  ]),
  transition('flipped => default', [
    animate('0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)')
  ])
]);

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(10px)' }),
    animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('0.3s ease-in', style({ opacity: 0, transform: 'translateY(10px)' }))
  ])
]);

export const popIn = trigger('popIn', [
  transition(':enter', [
    style({ transform: 'scale(0.5)', opacity: 0 }),
    animate('0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)', style({ transform: 'scale(1)', opacity: 1 }))
  ])
]);

export const slideIn = trigger('slideIn', [
  transition(':enter', [
    style({ transform: 'translateX(30px)', opacity: 0 }),
    animate('0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);

export const staggerList = trigger('staggerList', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(15px)' }),
      stagger('50ms', [
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);
