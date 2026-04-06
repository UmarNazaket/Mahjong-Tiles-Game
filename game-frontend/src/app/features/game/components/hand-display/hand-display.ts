import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hand-display',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Hand Display Placeholder</div>`
})
export class HandDisplay {
  @Input() hand: any;
}
