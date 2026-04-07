import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LeaderboardStore } from '../../../../store/leaderboard/leaderboard.store';
import { popIn, staggerList } from '../../../../shared/animations/game.animations';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, DatePipe],
  animations: [popIn, staggerList],
  template: `
    <div class="leaderboard-container" [@popIn]>
      <div class="header">
        <h2 class="title">HALL OF FAME</h2>
        <span class="subtitle">Top Earners</span>
      </div>

      <div class="entries-list" [@staggerList]="store.entries().length">
        <div *ngIf="store.entries().length === 0" class="empty-state">
          No heroic fortunes claimed yet.
        </div>
        
        <div 
          class="entry-item" 
          *ngFor="let entry of store.entries(); let i = index"
          [class.top-three]="i < 3"
        >
          <div class="rank">#{{ i + 1 }}</div>
          <div class="player-info">
            <span class="name">{{ entry.playerName }}</span>
            <span class="date">{{ entry.date | date:'mediumDate' }}</span>
          </div>
          <div class="score-info">
            <span class="score">{{ entry.score }}</span>
            <span class="rounds">in {{ entry.roundsPlayed }} rnds</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .leaderboard-container {
      background: rgba(30, 30, 30, 0.6);
      border-radius: 24px;
      padding: 2.5rem;
      border: 1px solid rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(20px);
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
      width: 100%;
      max-width: 500px;
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .title {
      font-size: 1.5rem;
      font-weight: 800;
      color: #fff;
      letter-spacing: 4px;
      margin: 0;
    }

    .subtitle {
      font-size: 0.8rem;
      color: #00d2ff;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 600;
    }

    .entries-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .empty-state {
      text-align: center;
      padding: 2rem;
      color: rgba(255, 255, 255, 0.4);
      font-style: italic;
    }

    .entry-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.5rem;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.03);
      transition: all 0.3s ease;
    }

    .entry-item:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: translateX(5px);
    }

    .entry-item.top-three {
      background: linear-gradient(90deg, rgba(0, 210, 255, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
      border-left: 4px solid #00d2ff;
    }

    .rank {
      font-size: 1.2rem;
      font-weight: 900;
      color: rgba(255, 255, 255, 0.2);
      width: 30px;
    }

    .top-three .rank {
      color: #00d2ff;
    }

    .player-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .name {
      font-size: 1.1rem;
      font-weight: 700;
      color: white;
    }

    .date {
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.4);
    }

    .score-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .score {
      font-size: 1.5rem;
      font-weight: 900;
      color: #00d2ff;
      font-family: 'Outfit', sans-serif;
    }

    .rounds {
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.4);
    }
  `]
})
export class LeaderboardComponent implements OnInit {
  readonly store = inject(LeaderboardStore);

  ngOnInit() {
    this.store.loadScores();
  }
}
