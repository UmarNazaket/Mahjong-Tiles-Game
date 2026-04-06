import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deck-status',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Deck Status Placeholder</div>`
})
export class DeckStatus {
  @Input() drawCount: number = 0;
  @Input() discardCount: number = 0;
  @Input() reshuffleCount: number = 0;
}
