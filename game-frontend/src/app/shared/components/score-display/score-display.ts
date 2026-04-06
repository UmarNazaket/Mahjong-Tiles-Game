import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-display',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Score: {{ score }}</div>`
})
export class ScoreDisplay {
  @Input() score: number = 0;
}
