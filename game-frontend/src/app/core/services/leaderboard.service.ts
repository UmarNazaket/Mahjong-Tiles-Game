import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { LeaderboardEntry } from '../models/leaderboard.model';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private storage = inject(StorageService);
  private readonly leaderboardKey = 'mahjong_high_scores';

  getTopScores(limit: number): LeaderboardEntry[] {
    const scores = this.storage.get<LeaderboardEntry[]>(this.leaderboardKey) || [];
    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  saveScore(entry: LeaderboardEntry): void {
    const scores = this.storage.get<LeaderboardEntry[]>(this.leaderboardKey) || [];
    scores.push(entry);
    
    // Sort and keep top 10 in storage
    const topScores = scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    this.storage.set(this.leaderboardKey, topScores);
  }

  clear(): void {
    this.storage.remove(this.leaderboardKey);
  }
}
