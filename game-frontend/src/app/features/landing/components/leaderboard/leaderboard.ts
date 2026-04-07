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
      background: rgba(30, 30, 36, 0.6);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 1.5rem;
      width: 100%;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .lb-title {
      color: #fff;
      margin: 0 0 1.5rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.25rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
    }
    .empty-state {
      text-align: center;
      padding: 2rem 0;
      color: #aaa;
      font-style: italic;
    }
    .lb-table {
      width: 100%;
      border-collapse: collapse;
      color: #ccc;
    }
    th {
      text-align: left;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 1px;
      color: #888;
      padding-bottom: 1rem;
    }
    td {
      padding: 0.75rem 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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
      width: 50px;
      font-weight: bold;
    }
    .name-cell {
      color: #fff;
      font-weight: 500;
    }
    .score-cell {
      font-weight: bold;
      color: #4cd137;
      font-size: 1.1rem;
    }
    .date-cell {
      font-size: 0.85rem;
      color: #777;
    }
    
    .top-1 .name-cell { color: #f1c40f; font-weight: bold; }
    .top-2 .name-cell { color: #bdc3c7; }
    .top-3 .name-cell { color: #cd6133; }
  `]
})
export class LeaderboardComponent {
  @Input() entries: LeaderboardEntry[] = [];
}
