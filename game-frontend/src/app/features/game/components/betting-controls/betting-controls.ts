import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-betting-controls',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Betting Controls Placeholder</div>`
})
export class BettingControls {
  @Input() disabled: boolean = false;
  @Output() bet = new EventEmitter<any>();
}
