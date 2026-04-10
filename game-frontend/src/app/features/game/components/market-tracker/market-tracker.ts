import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tile } from '../../../../core/models/tile.model';
import { TileCategory, WindType, DragonType } from '../../../../core/enums/game.enums';
import { TileComponent } from '../tile/tile.component';
import { DEFAULT_GAME_CONFIG } from '../../../../core/config/game.config';

@Component({
  selector: 'app-market-tracker',
  standalone: true,
  imports: [CommonModule, TileComponent],
  template: `
    <div class="market-tracker">
      <div class="tracker-header">
        <div class="header-main">
          <h3>Market Prices</h3>
          <span class="subtitle">Live non-number tile values</span>
        </div>
        <div class="info-icon">
          i
          <div class="tooltip">
            <strong>Non-Number Tiles:</strong><br> Start at a base value of 5.<br><br>
            <strong>Dynamic Scaling:</strong><br> Increases +1 if part of a winning hand. Decreases -1 if part of a tie/losing hand.<br><br>
            <strong>Game Ends:</strong><br> If any single tile reaches 0 or 10.
          </div>
        </div>
      </div>
      <div class="tracker-tiles">
        <div class="tile-group" title="Winds">
          <app-tile *ngFor="let tile of windTiles" [tile]="tile" [compact]="true" [hideArrows]="true"></app-tile>
        </div>
        <div class="divider"></div>
        <div class="tile-group" title="Dragons">
          <app-tile *ngFor="let tile of dragonTiles" [tile]="tile" [compact]="true" [hideArrows]="true"></app-tile>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .market-tracker {
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      border-radius: 20px;
      padding: 1.25rem;
      border: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      box-shadow: var(--card-shadow);
      z-index: 50;
      position: relative;
    }
    .tracker-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-left: 3px solid var(--primary-color);
      padding-left: 0.75rem;
    }
    .header-main {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    h3 {
      margin: 0;
      color: var(--text-color);
      font-size: 0.85rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    .info-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      margin-top: 0.15rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      color: var(--secondary-color);
      font-size: 0.65rem;
      font-weight: 900;
      font-family: serif;
      cursor: help;
      position: relative;
      transition: background 0.2s, color 0.2s;
    }
    .info-icon:hover {
      background: var(--primary-color);
      color: var(--bg-dark);
    }
    .tooltip {
      visibility: hidden;
      opacity: 0;
      position: absolute;
      top: 140%;
      right: -10px;
      width: 260px;
      background: rgba(15, 23, 42, 0.98);
      color: var(--white);
      padding: 1.25rem;
      border-radius: 12px;
      font-family: 'Outfit', 'Inter', sans-serif;
      font-size: 0.85rem;
      font-weight: 400;
      line-height: 1.5;
      letter-spacing: 0.2px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.8);
      border: 1px solid rgba(255, 255, 255, 0.15);
      transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      z-index: 9999;
      pointer-events: none;
      text-align: left;
    }
    .tooltip strong {
      color: var(--primary-color);
      font-weight: 700;
      font-size: 0.9rem;
    }
    .info-icon:hover .tooltip {
      visibility: visible;
      opacity: 1;
      top: 120%;
    }
    .subtitle {
      font-size: 0.7rem;
      color: var(--secondary-color);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    @media (max-width: 768px) {
      .market-tracker {
        padding: 1rem;
        gap: 1rem;
        width: 100%;
      }
      .tracker-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .tracker-tiles {
        gap: 1rem;
        /* Keep horizontal scrolling but shrink gap */
      }
      .header-main h3 {
        font-size: 0.75rem;
      }
      .tooltip {
        right: auto;
        left: 0;
        width: 240px; /* slightly narrower for safety */
      }
    }

    .tracker-tiles {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
    }
    .tile-group {
      display: flex;
      gap: 0.5rem;
    }
    .divider {
      width: 1px;
      height: 24px;
      background: var(--border-color);
    }
  `]
})
export class MarketTracker implements OnChanges {
  @Input() tileValueMap: Map<string, number> = new Map();

  windTiles: Tile[] = [];
  dragonTiles: Tile[] = [];

  constructor() {
    this.initDummyTiles();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tileValueMap']) {
      this.updateTileValues();
    }
  }

  private initDummyTiles() {
    // Winds
    this.windTiles = [WindType.East, WindType.South, WindType.West, WindType.North].map((w, i) => ({
      id: `wind_${i}`,
      category: TileCategory.Wind,
      name: `${w} Wind`,
      baseValue: DEFAULT_GAME_CONFIG.nonNumberBaseValue,
      currentValue: DEFAULT_GAME_CONFIG.nonNumberBaseValue
    }));

    // Dragons
    this.dragonTiles = [DragonType.Red, DragonType.Green, DragonType.White].map((d, i) => ({
      id: `dragon_${i}`,
      category: TileCategory.Dragon,
      name: `${d} Dragon`,
      baseValue: DEFAULT_GAME_CONFIG.nonNumberBaseValue,
      currentValue: DEFAULT_GAME_CONFIG.nonNumberBaseValue
    }));
  }

  private updateTileValues() {
    const map = this.tileValueMap;
    // Update Winds
    this.windTiles = this.windTiles.map(t => ({
      ...t,
      currentValue: map.get(t.name) ?? t.baseValue
    }));
    // Update Dragons
    this.dragonTiles = this.dragonTiles.map(t => ({
      ...t,
      currentValue: map.get(t.name) ?? t.baseValue
    }));
  }
}
