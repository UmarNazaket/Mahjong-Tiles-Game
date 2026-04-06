import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tile } from '../../../../core/models/tile.model';

/**
 * Empty Shell for TileComponent (Phase 1)
 */
@Component({
  selector: 'app-tile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tile-stub">
      Tile: {{ tile?.name }}
    </div>
  `,
  styles: [`
    .tile-stub {
      padding: 1rem;
      border: 1px dashed #ccc;
      margin: 0.5rem;
    }
  `]
})
export class TileComponent {
  @Input() tile?: Tile;
  @Input() compact: boolean = false;
}
