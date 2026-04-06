import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Header Placeholder</div>`
})
export class Header {
  @Input() showStats: boolean = false;
  @Input() score: number = 0;
}
