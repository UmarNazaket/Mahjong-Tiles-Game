import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tile } from '../../../../core/models/tile.model';
import { TileIconPipe } from '../../../../shared/pipes/tile-icon.pipe';
import { SoundService } from '../../../../core/services/sound.service';

@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule, TileIconPipe],
  template: `
    <div class="tile" 
         [class.compact]="compact" 
         [class.danger]="isDangerZone && showHighlight">
      <div class="tile-inner"
           [class.is-revealing]="isRevealing"
           [style.animation-delay]="animationDelay">

        <!-- Front Face -->
        <div class="tile-face tile-front">
          <!-- Tile Name Label -->
          <div class="tile-name" *ngIf="!compact">{{ tile.name }}</div>

          <!-- Icon -->
          <div class="tile-icon" 
               [class.is-dragon]="tile.category === 'DRAGON'" 
               [class.is-wind]="tile.category === 'WIND'"
               [class.is-character]="tile.suit === 'CHARACTER'"
               [class.is-circle]="tile.suit === 'CIRCLE'"
               [class.is-bamboo]="tile.suit === 'BAMBOO'">
            {{ tile | tileIcon }}
          </div>

          <!-- Value + Change Indicator -->
          <div class="tile-value-row">
            <span class="change-indicator up" *ngIf="valueDelta > 0 && !hideArrows">▲</span>
            <span class="change-indicator down" *ngIf="valueDelta < 0 && !hideArrows">▼</span>
            <span class="tile-value" 
                  [class.changed]="hasValueChanged"
                  [class.danger-value]="isDangerZone">
              {{ tile.currentValue }}
            </span>
          </div>
        </div>

        <!-- Back Face (Luxe Emerald Mahjong Back) -->
        <div class="tile-face tile-back">
          <div class="back-ornament">✦</div>
          <div class="back-center">
            <div class="back-inner-border">
              <span class="back-symbol">🀄</span>
            </div>
          </div>
          <div class="back-ornament">✦</div>
        </div>

      </div>

      <!-- Tooltip: only for Dragon/Wind tiles, hidden in compact mode -->
      <div class="tile-tooltip" *ngIf="tooltipText && !compact">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-label">Market Value</div>
        <div class="tooltip-formula">{{ tooltipText }}</div>
        <div class="tooltip-hint" *ngIf="isDangerZone">⚠️ Extreme zone!</div>
      </div>
    </div>
  `,
  styles: [`
    /* ── Outer container: perspective context only ── */
    .tile {
      width: 75px;
      height: 100px;
      perspective: 1000px;
      cursor: default;
    }
    .tile.compact {
      width: 42px;
      height: 58px;
    }

    /* ── The rotating card ── */
    .tile-inner {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      border-radius: 12px;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.5);
      /* Default resting state: showing front face */
      transform: rotateY(0deg);
    }

    /*
     * CSS-only staggered flip reveal.
     *
     * animation-fill-mode: both means:
     *   - BEFORE delay: element shows "from" (rotateY 180deg = back face)
     *   - DURING animation: rotates from 180deg → 0deg (back → front)
     *   - AFTER animation: stays at "to" (rotateY 0deg = front face)
     *
     * The per-tile animation-delay is injected via [style.animation-delay].
     * No JavaScript timers involved — immune to change detection races.
     */
    @keyframes flipReveal {
      from { transform: rotateY(180deg); }
      to   { transform: rotateY(0deg);   }
    }

    .tile-inner.is-revealing {
      animation: flipReveal 0.55s cubic-bezier(0.4, 0, 0.2, 1) both;
      /* animation-delay set via [style.animation-delay] input */
    }

    /* Danger zone pulsing glow */
    .tile.danger .tile-inner {
      box-shadow: 0 0 15px 5px rgba(238, 82, 83, 0.4);
      border: 2px solid #ee5253;
      animation: dangerPulse 2s ease-in-out infinite;
    }
    @keyframes dangerPulse {
      0%, 100% { box-shadow: 0 0 10px 2px rgba(238, 82, 83, 0.3); }
      50%       { box-shadow: 0 0 20px 8px rgba(238, 82, 83, 0.5); }
    }

    /* ── Shared face styles ── */
    .tile-face {
      position: absolute;
      inset: 0;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 6px 4px;
    }

    /* ── Front face ── */
    .tile-front {
      background: linear-gradient(135deg, #ffffff, #f1f5f9);
      border: 1px solid rgba(0, 0, 0, 0.1);
      transform: rotateY(0deg); /* explicitly front */
    }

    /* ── Back face — pre-rotated 180° so it's hidden until we flip ── */
    .tile-back {
      background: linear-gradient(145deg, #064e3b 0%, #065f46 50%, #047857 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      transform: rotateY(180deg);
      justify-content: space-between;
      padding: 8px 6px;
    }

    .back-ornament {
      font-size: 0.5rem;
      color: rgba(255, 255, 255, 0.2);
      letter-spacing: 2px;
    }

    .back-center {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    .back-inner-border {
      width: 40px;
      height: 40px;
      border: 1.5px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.15);
    }

    .back-symbol {
      font-size: 1.5rem;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.4));
      opacity: 0.65;
    }

    .compact .back-inner-border { width: 24px; height: 24px; }
    .compact .back-symbol { font-size: 0.9rem; }
    .compact .back-ornament { font-size: 0.3rem; }

    /* ── Front: tile name ── */
    .tile-name {
      font-size: 0.5rem;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 800;
      letter-spacing: 0.5px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 90%;
      padding: 0 2px;
      opacity: 0.7;
    }

    /* ── Front: icon ── */
    .tile-icon {
      font-size: 2.25rem;
      line-height: 1;
      flex-shrink: 0;
      color: #1e293b;
      filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.05));
    }
    .compact .tile-icon { font-size: 1.4rem; }
    .is-dragon    { color: #d63031; }
    .is-wind      { color: #0f172a; }
    .is-character { color: #334155; }
    .is-circle    { color: #2e86de; }
    .is-bamboo    { color: #10ac84; }

    /* ── Front: value row ── */
    .tile-value-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
      margin-bottom: 2px;
      width: 100%;
    }

    .tile-value {
      font-weight: 900;
      font-size: 0.9rem;
      background: #f1f5f9;
      color: #1e293b;
      border-radius: 4px;
      padding: 1px 6px;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    .compact .tile-value-row { gap: 1px; }
    .compact .tile-value {
      font-size: 0.65rem;
      padding: 0 4px;
    }
    .tile-value.changed {
      background: rgba(255, 179, 0, 0.15);
      color: #b45309;
      border-color: rgba(255, 179, 0, 0.3);
    }
    .tile-value.danger-value {
      background: #fee2e2;
      color: #b91c1c;
      border-color: #fecaca;
    }

    /* ── Change indicators ── */
    .change-indicator {
      font-size: 0.55rem;
      font-weight: 900;
      line-height: 1;
    }
    .compact .change-indicator { font-size: 0.4rem; }
    .change-indicator.up   { color: #10ac84; }
    .change-indicator.down { color: #ee5253; }

    /* ── Responsive Tile Sizes ── */
    @media (max-width: 1024px) {
      .tile { width: 68px; height: 90px; }
      .tile-icon { font-size: 2rem; }
      .tile-value { font-size: 0.8rem; padding: 1px 4px; }
      .back-inner-border { width: 34px; height: 34px; }
      .back-symbol { font-size: 1.25rem; }
    }
    @media (max-width: 768px) {
      .tile { width: 54px; height: 74px; }
      .tile-name { font-size: 0.4rem; letter-spacing: 0; }
      .tile-icon { font-size: 1.5rem; }
      .tile-value { font-size: 0.7rem; padding: 0 4px; }
      .change-indicator { font-size: 0.45rem; }
      .back-inner-border { width: 28px; height: 28px; }
      .back-symbol { font-size: 1rem; }
      .back-ornament { font-size: 0.4rem; }
      .tile-face { padding: 4px 2px; }
    }

    /* ── Tooltip ── */
    .tile {
      position: relative; /* tooltip positioned relative to tile */
    }

    .tile-tooltip {
      position: absolute;
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      background: rgba(10, 18, 35, 0.97);
      border: 1px solid rgba(255, 179, 0, 0.3);
      border-radius: 10px;
      padding: 0.5rem 0.75rem;
      white-space: nowrap;
      z-index: 100;
      pointer-events: none;
      opacity: 0;
      transform: translateX(-50%) translateY(4px);
      transition: opacity 0.2s ease, transform 0.2s ease;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    }

    /* Show tooltip on tile hover */
    .tile:hover .tile-tooltip {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    /* Downward pointing arrow */
    .tooltip-arrow {
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid rgba(255, 179, 0, 0.35);
    }
    .tooltip-arrow::after {
      content: '';
      position: absolute;
      bottom: 1px;
      left: -5px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid rgba(10, 18, 35, 0.97);
    }

    .tooltip-label {
      font-size: 0.5rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #FFB300;
      margin-bottom: 0.2rem;
    }

    .tooltip-formula {
      font-size: 0.75rem;
      font-weight: 700;
      color: #ffffff;
      font-variant-numeric: tabular-nums;
    }

    .tooltip-hint {
      font-size: 0.6rem;
      color: #ee5253;
      margin-top: 0.2rem;
      font-weight: 700;
    }
  `]
})
export class TileComponent implements OnInit, OnChanges {
  private cdr = inject(ChangeDetectorRef);
  private sound = inject(SoundService);

  @Input({ required: true }) tile!: Tile;
  @Input() compact: boolean = false;
  @Input() hideArrows: boolean = false;
  @Input() showHighlight: boolean = true;
  /** Per-tile stagger delay (ms). Only used when animateFlip=true. */
  @Input() delay: number = 0;
  /** Set true ONLY on current-hand tiles. History/compact tiles leave this false. */
  @Input() animateFlip: boolean = false;

  isRevealing = false;

  get animationDelay(): string {
    return this.delay + 'ms';
  }

  get hasValueChanged(): boolean {
    return this.tile.currentValue !== this.tile.baseValue;
  }

  get valueDelta(): number {
    return this.tile.lastDelta || 0;
  }

  /** Tile is in the danger zone if it's a special tile (Wind/Dragon) AND value is extreme */
  get isDangerZone(): boolean {
    const isSpecial = this.tile.category === 'WIND' || this.tile.category === 'DRAGON';
    const isExtreme = this.tile.currentValue <= 2 || this.tile.currentValue >= 8;
    return isSpecial && isExtreme;
  }

  /**
   * Tooltip formula text shown on hover for Dragon/Wind tiles.
   * E.g. "Base 5 + 4 = Value 9"  or  "Base 5 − 2 = Value 3"  or  "Base 5, at start"
   */
  get tooltipText(): string | null {
    const isSpecial = this.tile.category === 'WIND' || this.tile.category === 'DRAGON';
    if (!isSpecial) return null;

    const delta = this.tile.currentValue - this.tile.baseValue;
    if (delta === 0) {
      return `Base ${this.tile.baseValue} — unchanged`;
    }
    const sign = delta > 0 ? '+' : '−';
    return `Base ${this.tile.baseValue} ${sign} ${Math.abs(delta)} = Value ${this.tile.currentValue}`;
  }

  /**
   * Kick off the reveal when the component first appears (initial game load).
   * Setting isRevealing=true adds the .is-revealing CSS class.
   * CSS animation-fill-mode:backwards keeps the tile showing the back face
   * during the animation-delay period, so no extra JS timeout needed.
   */
  ngOnInit() {
    if (this.animateFlip) {
      this.isRevealing = true;
      // Play clack in sync with the CSS flip (delay matches animation-delay)
      setTimeout(() => this.sound.playClack(), this.delay);
    }
  }

  /**
   * Replay the reveal animation when a completely different tile takes this slot.
   * We must remove the class for one paint frame before re-adding it,
   * otherwise the browser won't restart the CSS animation.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!changes['tile'] || changes['tile'].isFirstChange()) return;

    const isNewTileId = changes['tile'].previousValue?.id !== changes['tile'].currentValue?.id;

    if (this.animateFlip && isNewTileId) {
      this.isRevealing = false;
      this.cdr.detectChanges();

      requestAnimationFrame(() => {
        this.isRevealing = true;
        this.cdr.detectChanges();
        // Play clack in sync with the flip animation delay
        setTimeout(() => this.sound.playClack(), this.delay);
      });
    }
  }
}
