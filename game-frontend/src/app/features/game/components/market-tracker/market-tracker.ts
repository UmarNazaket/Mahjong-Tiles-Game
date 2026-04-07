import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';

@Component({
  selector: 'app-market-tracker',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="market-tracker-container">
      <div class="header">
        <h3 class="title">MARKET PRICES</h3>
        <span class="subtitle">Winds & Dragons</span>
      </div>
      <div class="tracker-grid">
        <div class="tracker-item" *ngFor="let item of sortedMarket | keyvalue" [class.changed]="changedKeys.has(item.key)">
          <span class="tile-name">{{ item.key }}</span>
          <span class="tile-price">{{ item.value }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .market-tracker-container {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 16px;
      padding: 1.5rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
    .header {
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
    }
    .title {
      margin: 0;
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 2px;
      color: #00d2ff;
    }
    .subtitle {
      font-size: 0.6rem;
      color: rgba(255, 255, 255, 0.5);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .tracker-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }
    .tracker-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(0, 0, 0, 0.2);
      padding: 0.5rem 0.8rem;
      border-radius: 8px;
      border: 1px solid transparent;
      transition: all 0.3s ease;
    }
    .tracker-item.changed {
      background: rgba(0, 210, 255, 0.15);
      border-color: rgba(0, 210, 255, 0.5);
      transform: scale(1.05);
    }
    .tile-name {
      font-size: 0.7rem;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.8);
    }
    .tile-price {
      font-size: 1rem;
      font-weight: 800;
      color: white;
      font-family: 'Outfit', sans-serif;
    }
  `]
})
export class MarketTracker implements OnChanges {
  @Input() tileValueMap: Map<string, number> = new Map();
  sortedMarket: { [key: string]: number } = {};
  changedKeys = new Set<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tileValueMap'] && this.tileValueMap) {
      const newSortedMarket: { [key: string]: number } = {};
      const newChangedKeys = new Set<string>();
      
      // Convert map to object for ngFor and track changes
      this.tileValueMap.forEach((value, key) => {
        newSortedMarket[key] = value;
        if (this.sortedMarket[key] !== undefined && this.sortedMarket[key] !== value) {
          newChangedKeys.add(key);
        }
      });
      
      this.sortedMarket = newSortedMarket;
      this.changedKeys = newChangedKeys;
      
      // Clear highlight after animation delay
      if (this.changedKeys.size > 0) {
        setTimeout(() => {
          this.changedKeys.clear();
        }, 1000);
      }
    }
  }
}
