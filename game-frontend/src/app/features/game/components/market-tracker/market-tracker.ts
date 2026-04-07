import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tile } from '../../../../core/models/tile.model';
import { TileCategory, WindType, DragonType } from '../../../../core/enums/game.enums';
import { TileComponent } from '../tile/tile.component';

@Component({
  selector: 'app-market-tracker',
  standalone: true,
  imports: [CommonModule, TileComponent],
  template: `
    <div class="market-tracker">
      <div class="tracker-header">
        <h3>Market Prices</h3>
        <span class="subtitle">Live non-number tile values</span>
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
      padding: 1rem;
      border: 1px solid var(--border-color);
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      box-shadow: var(--card-shadow);
    }
    .tracker-header {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      border-left: 3px solid var(--primary-color);
      padding-left: 0.75rem;
    }
    h3 {
      margin: 0;
      color: var(--text-color);
      font-size: 0.85rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    .subtitle {
      font-size: 0.7rem;
      color: var(--secondary-color);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
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
      baseValue: 5,
      currentValue: 5
    }));

    // Dragons
    this.dragonTiles = [DragonType.Red, DragonType.Green, DragonType.White].map((d, i) => ({
      id: `dragon_${i}`,
      category: TileCategory.Dragon,
      name: `${d} Dragon`,
      baseValue: 5,
      currentValue: 5
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
