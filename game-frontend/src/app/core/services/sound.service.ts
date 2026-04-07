import { Injectable } from '@angular/core';

/**
 * SoundService — synthesizes all game sounds via the Web Audio API.
 * No external audio files required. Respects the OS mute/volume settings.
 */
@Injectable({ providedIn: 'root' })
export class SoundService {
  private ctx: AudioContext | null = null;
  private _muted = false;

  get muted(): boolean { return this._muted; }

  toggleMute(): boolean {
    this._muted = !this._muted;
    return this._muted;
  }

  // ─── Public API ───────────────────────────────────────────────

  /** Short percussive "clack" when a tile flips to reveal its face. */
  playClack() {
    this.play((ctx, t) => {
      // Noise burst for the 'crack' transient
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 4);
      }
      const src = ctx.createBufferSource();
      src.buffer = buf;

      // High-pass filter for a crisp "tile on table" sound
      const hpf = ctx.createBiquadFilter();
      hpf.type = 'highpass';
      hpf.frequency.value = 2200;

      // Tone layer: short click tone
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(900, t);
      osc.frequency.exponentialRampToValueAtTime(200, t + 0.05);

      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(0.00, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

      src.connect(hpf);
      hpf.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      src.start(t);
      src.stop(t + 0.08);
      osc.start(t);
      osc.stop(t + 0.08);
    });
  }

  /** Bright chime "ding" for a correct bet (WIN). */
  playDing() {
    this.play((ctx, t) => {
      const freqs = [880, 1100, 1320]; // A5, C#6, E6 — major chord arpeggio

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const gain = ctx.createGain();
        const startTime = t + i * 0.06;
        gain.gain.setValueAtTime(0.0, startTime);
        gain.gain.linearRampToValueAtTime(0.22, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        // Overtone shimmer
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.value = freq * 2;
        const gain2 = ctx.createGain();
        gain2.gain.setValueAtTime(0.0, startTime);
        gain2.gain.linearRampToValueAtTime(0.06, startTime + 0.01);
        gain2.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
        osc2.start(startTime);
        osc2.stop(startTime + 0.4);
      });
    });
  }

  /** Deep bass "thud" for a wrong bet (LOSS). */
  playThud() {
    this.play((ctx, t) => {
      // Low boom
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.25);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.55, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

      // Sub-bass layer for weight
      const sub = ctx.createOscillator();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(80, t);
      sub.frequency.exponentialRampToValueAtTime(20, t + 0.2);

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.35, t);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      // Gritty noise smack at the front
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buf;

      const lpf = ctx.createBiquadFilter();
      lpf.type = 'lowpass';
      lpf.frequency.value = 300;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      sub.connect(subGain);
      subGain.connect(ctx.destination);
      noise.connect(lpf);
      lpf.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc.start(t); osc.stop(t + 0.35);
      sub.start(t); sub.stop(t + 0.25);
      noise.start(t); noise.stop(t + 0.05);
    });
  }

  // ─── Private helpers ──────────────────────────────────────────

  private play(fn: (ctx: AudioContext, startTime: number) => void) {
    if (this._muted) return;
    try {
      if (!this.ctx) this.ctx = new AudioContext();
      if (this.ctx.state === 'suspended') this.ctx.resume();
      fn(this.ctx, this.ctx.currentTime);
    } catch (e) {
      // Silently fail if AudioContext not available (non-browser env or blocked)
    }
  }
}
