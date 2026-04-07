import { Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LeaderboardEntry } from '../../../../core/models/leaderboard.model';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: `
    <div class="leaderboard-card">
      <h3 class="lb-title">
        <span class="icon">🏆</span> Top Players
      </h3>
      
      <div class="empty-state" *ngIf="entries.length === 0">
        No scores yet. Be the first to play!
      </div>
      
      <table class="lb-table" *ngIf="entries.length > 0">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th class="score-col">Score</th>
            <th class="date-col">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let entry of entries; let i = index" [class.top-1]="i === 0" [class.top-2]="i === 1" [class.top-3]="i === 2">
            <td class="rank-cell">
              <span *ngIf="i === 0">🥇</span>
              <span *ngIf="i === 1">🥈</span>
              <span *ngIf="i === 2">🥉</span>
              <span *ngIf="i > 2">#{{ i + 1 }}</span>
            </td>
            <td class="name-cell">{{ entry.playerName }}</td>
            <td class="score-cell">{{ entry.score }}</td>
            <td class="date-cell">{{ entry.date | date:'MMM d, y' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .leaderboard-card {
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      padding: 2rem;
      width: 100%;
      box-shadow: var(--card-shadow);
    }
    .lb-title {
      color: var(--text-color);
      margin: 0 0 2rem 0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      padding-bottom: 1rem;
      border-bottom: 2px solid var(--primary-color);
    }
    .empty-state {
      text-align: center;
      padding: 3rem 0;
      color: var(--secondary-color);
      font-style: italic;
      font-size: 0.95rem;
    }
    .lb-table {
      width: 100%;
      border-collapse: collapse;
      color: var(--text-color);
    }
    th {
      text-align: left;
      text-transform: uppercase;
      font-size: 0.65rem;
      letter-spacing: 1.5px;
      color: var(--secondary-color);
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--border-color);
    }
    td {
      padding: 1.25rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
      font-size: 0.95rem;
      font-weight: 500;
    }
    tr:last-child td {
      border-bottom: none;
    }
    .score-col, .score-cell {
      text-align: center;
    }
    .date-col, .date-cell {
      text-align: right;
    }
    .rank-cell {
      width: 60px;
      font-weight: 800;
      color: var(--secondary-color);
      font-size: 0.85rem;
    }
    .name-cell {
      color: var(--text-color);
      font-weight: 600;
    }
    .score-cell {
      font-weight: 900;
      color: var(--primary-color);
      font-size: 1.1rem;
    }
    .date-cell {
      font-size: 0.8rem;
      color: var(--secondary-color);
    }
    
    .top-1 .name-cell { color: var(--accent-color); font-weight: 900; }
    .top-1 .rank-cell { color: var(--accent-color); }
    .top-2 .name-cell { color: #cbd5e1; }
    .top-3 .name-cell { color: #94a3b8; }
  `]
})
export class LeaderboardComponent {
  @Input() entries: LeaderboardEntry[] = [];
}
