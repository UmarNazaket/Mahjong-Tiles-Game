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
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .tracker-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    h3 {
      margin: 0;
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
    }
    .subtitle {
      font-size: 0.75rem;
      color: #aaa;
    }
    .tracker-tiles {
      display: flex;
      align-items: center;
      gap: 1rem;
      overflow-x: auto;
      padding-bottom: 0.5rem;
    }
    .tile-group {
      display: flex;
      gap: 0.5rem;
    }
    .divider {
      width: 1px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
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
