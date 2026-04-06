import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Leaderboard Placeholder</div>`
})
export class LeaderboardComponent {
  @Input() entries: any[] = [];
}
