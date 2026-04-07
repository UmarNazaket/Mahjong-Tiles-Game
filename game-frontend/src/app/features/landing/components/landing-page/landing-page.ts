import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LeaderboardComponent } from '../leaderboard/leaderboard';
import { fadeInOut, popIn } from '../../../../shared/animations/game.animations';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, LeaderboardComponent],
  animations: [fadeInOut, popIn],
  template: `
    <div class="landing-container" [@fadeInOut]>
      
      <div class="hero-section" [@popIn]>
        <div class="title-wrapper">
          <h1 class="main-title">MAHJONG</h1>
          <h2 class="sub-title">MARKET BETTER</h2>
        </div>
        
        <p class="description">
          A high-stakes fusion of traditional Mahjong mechanics and volatile market trading. Predict the value swings, ride the dragons, and build your fortune.
        </p>
        
        <button class="play-btn" (click)="startGame()">
          <span class="btn-text">PLAY NOW</span>
          <span class="btn-icon">→</span>
        </button>
      </div>

      <div class="leaderboard-section">
        <app-leaderboard></app-leaderboard>
      </div>

    </div>
  `,
  styles: [`
    .landing-container {
      min-height: 100vh;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 5rem;
      padding: 4rem;
      background: radial-gradient(circle at 30% 50%, #1a2a6c 0%, #112a46 40%, #0d0d0d 100%);
    }

    @media (max-width: 1024px) {
      .landing-container {
        flex-direction: column;
        text-align: center;
        gap: 3rem;
        padding: 2rem;
      }
    }

    .hero-section {
      max-width: 500px;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    @media (max-width: 1024px) {
      .hero-section {
        align-items: center;
      }
    }

    .title-wrapper {
      display: flex;
      flex-direction: column;
      line-height: 1;
    }

    .main-title {
      font-size: 5rem;
      font-weight: 900;
      color: white;
      margin: 0;
      letter-spacing: 5px;
      text-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .sub-title {
      font-size: 2rem;
      font-weight: 800;
      color: #00d2ff;
      margin: 0;
      letter-spacing: 8px;
      background: linear-gradient(90deg, #00d2ff 0%, #3a7bd5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.7);
      margin: 0;
    }

    .play-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
      border: none;
      border-radius: 50px;
      padding: 1.2rem 3rem;
      color: white;
      font-size: 1.2rem;
      font-weight: 800;
      letter-spacing: 2px;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0, 210, 255, 0.3);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      width: fit-content;
    }

    .play-btn:hover {
      transform: translateY(-5px) scale(1.05);
      box-shadow: 0 15px 40px rgba(0, 210, 255, 0.5);
    }

    .btn-icon {
      transition: transform 0.3s ease;
    }

    .play-btn:hover .btn-icon {
      transform: translateX(5px);
    }

    .leaderboard-section {
      flex: 1;
      display: flex;
      justify-content: center;
      width: 100%;
    }
  `]
})
export class LandingPage {
  constructor(private router: Router) {}

  startGame() {
    this.router.navigate(['/game']);
  }
}
