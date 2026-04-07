import { Injectable, effect, inject, signal } from '@angular/core';
import confetti from 'canvas-confetti';
import { GameStore } from '../../store/game/game.store';

export interface MilestoneEvent {
  score: number;
  id: number; // unique ID per event so toast can detect changes
}

@Injectable({ providedIn: 'root' })
export class ConfettiService {
  private gameStore = inject(GameStore);

  /** Emits whenever a new milestone is hit. GameLayout reads this to show the toast. */
  readonly milestoneEvent = signal<MilestoneEvent | null>(null);

  /** Tracks which multiples of 10 have already fired in the current game. */
  private firedMilestones = new Set<number>();

  constructor() {
    effect(() => {
      const score = this.gameStore.score();

      // Auto-reset when a new game starts (score goes back to 0)
      if (score === 0) {
        this.firedMilestones.clear();
        this.milestoneEvent.set(null);
        return;
      }

      this.checkMilestone(score);
    });
  }

  /** Optionally call this explicitly (e.g. on exit) to clear state early. */
  reset() {
    this.firedMilestones.clear();
    this.milestoneEvent.set(null);
  }

  private checkMilestone(score: number) {
    // Fire for every multiple of 10 that hasn't been triggered yet
    if (score > 0 && score % 10 === 0 && !this.firedMilestones.has(score)) {
      this.firedMilestones.add(score);
      this.milestoneEvent.set({ score, id: Date.now() });
      this.triggerConfetti(score);
    }
  }

  private triggerConfetti(score: number) {
    const isEpic = score >= 30; // Epic burst for 30+

    if (isEpic) {
      // 🎆 Multi-layered epic burst
      this.fireBurst(0.25, { spread: 26, startVelocity: 55 });
      this.fireBurst(0.2,  { spread: 60 });
      this.fireBurst(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      this.fireBurst(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      this.fireBurst(0.1,  { spread: 120, startVelocity: 45 });
      setTimeout(() => this.fireSideCannons(), 350);
    } else {
      // 🎉 Clean single burst for 10 / 20
      confetti({
        particleCount: score >= 20 ? 130 : 90,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#FFB300', '#FF6B6B', '#06D6A0', '#4ECDC4', '#FFE66D', '#FFFFFF'],
        gravity: 1.2,
        ticks: 220,
      });
    }
  }

  private fireBurst(particleRatio: number, opts: confetti.Options) {
    confetti({
      particleCount: Math.floor(200 * particleRatio),
      origin: { y: 0.6 },
      colors: ['#FFB300', '#FF6B6B', '#06D6A0', '#4ECDC4', '#FFE66D', '#AA44FF', '#FFFFFF'],
      gravity: 1.1,
      ...opts,
    });
  }

  private fireSideCannons() {
    const end = Date.now() + 900;
    const colors = ['#FFB300', '#FF6B6B', '#06D6A0', '#AA44FF'];
    const frame = () => {
      confetti({ particleCount: 5, angle: 60,  spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
}
