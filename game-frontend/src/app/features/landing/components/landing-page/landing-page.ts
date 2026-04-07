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
      background: linear-gradient(135deg, #0f0f13 0%, #1a1a24 100%);
      color: white;
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
      font-size: 3.5rem;
      font-weight: 900;
      line-height: 1.1;
      margin: 0 0 1rem 0;
      letter-spacing: -1px;
    }
    .accent {
      color: #3498db;
      background: -webkit-linear-gradient(45deg, #3498db, #9b59b6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      font-size: 1.2rem;
      color: #aaa;
      line-height: 1.5;
      margin: 0;
      max-width: 80%;
    }
    
    .play-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      background: linear-gradient(135deg, #3498db, #2980b9);
      color: white;
      border: none;
      padding: 1.25rem 2rem;
      border-radius: 50px;
      font-size: 1.3rem;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 10px 20px rgba(52, 152, 219, 0.3);
      transition: all 0.2s;
      width: fit-content;
    }
    .play-btn:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 25px rgba(52, 152, 219, 0.4);
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
