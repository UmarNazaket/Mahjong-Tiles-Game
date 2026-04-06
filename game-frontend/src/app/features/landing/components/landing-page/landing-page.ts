import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Landing Page Placeholder</div>`
})
export class LandingPage implements OnInit {
  ngOnInit() {}
  startGame() {}
}
