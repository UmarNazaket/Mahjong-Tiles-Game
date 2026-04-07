import { Injectable, Inject } from '@angular/core';
import { StorageService } from './storage.service';
import { LeaderboardEntry } from '../models/leaderboard.model';
import { GAME_CONFIG, GameConfig } from '../config/game.config';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private readonly STORAGE_KEY = 'mahjong_leaderboard';

  constructor(
    private storageService: StorageService,
    @Inject(GAME_CONFIG) private config: GameConfig
  ) {}

  getTopScores(): LeaderboardEntry[] {
    const data = this.storageService.get<LeaderboardEntry[]>(this.STORAGE_KEY);
    return data || [];
  }

  saveScore(entry: LeaderboardEntry): LeaderboardEntry[] {
    const scores = this.getTopScores();
    scores.push(entry);
    
    // Sort descending by score
    scores.sort((a, b) => b.score - a.score);
    
    // Keep only top N
    const topScores = scores.slice(0, this.config.leaderboardSize);
    this.storageService.set(this.STORAGE_KEY, topScores);
    
    return topScores;
  }

  clearScores(): void {
    this.storageService.remove(this.STORAGE_KEY);
  }
}
