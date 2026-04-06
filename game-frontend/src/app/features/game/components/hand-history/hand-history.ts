import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hand-history',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Hand History Placeholder</div>`
})
export class HandHistory {
  @Input() history: any[] = [];
}
