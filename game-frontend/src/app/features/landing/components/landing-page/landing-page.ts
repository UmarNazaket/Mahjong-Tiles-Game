import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LeaderboardStore } from '../../../../store/leaderboard/leaderboard.store';
import { LeaderboardComponent } from '../leaderboard/leaderboard';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, LeaderboardComponent],
  template: `
    <div class="landing-container">
      <div class="hero-section">
        <div class="title-wrapper">
          <div class="tiles-deco">
            <span>🀄</span>
            <span>🀅</span>
            <span>🀀</span>
          </div>
          <h1 class="main-title">Mahjong<br><span class="accent">Hand Betting</span></h1>
          <p class="subtitle">Will the next hand score higher or lower? Trust your instincts.</p>
        </div>
        
        <button class="play-btn" (click)="startGame()">
          <span class="icon">▶️</span>
          Start New Game
        </button>
      </div>

      <div class="leaderboard-section">
        <app-leaderboard [entries]="leaderboardStore.entries()"></app-leaderboard>
      </div>
    </div>
  `,
  styles: [`
    .landing-container {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at top right, #1e293b, #0f172a);
      color: var(--text-color);
      padding: 2rem;
      gap: 4rem;
    }
    .hero-section {
      flex: 1;
      max-width: 500px;
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }
    .leaderboard-section {
      flex: 1;
      max-width: 450px;
    }
    
    .title-wrapper {
      position: relative;
    }
    .tiles-deco {
      font-size: 3rem;
      margin-bottom: 1rem;
      display: flex;
      gap: 0.5rem;
      opacity: 0.8;
    }
    .main-title {
      font-size: 4rem;
      font-weight: 900;
      line-height: 1;
      margin: 0 0 1.5rem 0;
      letter-spacing: -3px;
      color: var(--text-color);
    }
    .accent {
      color: var(--primary-color);
      display: block;
      background: linear-gradient(to right, var(--primary-color), #a5f3fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      font-size: 1.15rem;
      color: var(--secondary-color);
      line-height: 1.6;
      margin: 0;
      max-width: 90%;
    }
    
    .play-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      background: linear-gradient(135deg, var(--primary-color), #4FA8CC);
      color: white;
      border: none;
      padding: 1.25rem 3rem;
      border-radius: 16px;
      font-size: 1.35rem;
      font-weight: 900;
      cursor: pointer;
      box-shadow: 0 10px 25px rgba(110, 193, 228, 0.3);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      width: fit-content;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .play-btn:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 15px 35px rgba(110, 193, 228, 0.4);
    }
    .play-btn:active {
      transform: translateY(1px);
    }
    
    @media (max-width: 900px) {
      .landing-container {
        flex-direction: column;
        padding: 2rem 1rem;
        height: auto;
        min-height: 100vh;
      }
      .hero-section {
        text-align: center;
        align-items: center;
      }
      .subtitle {
        max-width: 100%;
      }
    }
  `]
})
export class LandingPage implements OnInit {
  leaderboardStore = inject(LeaderboardStore);
  private router = inject(Router);

  ngOnInit() {
    this.leaderboardStore.loadScores();
  }

  startGame() {
    this.router.navigate(['/game']);
  }
}
