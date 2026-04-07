import { Pipe, PipeTransform } from '@angular/core';
import { Tile } from '../../core/models/tile.model';
import { TileCategory, TileSuit } from '../../core/enums/game.enums';

@Pipe({
  name: 'tileIcon',
  standalone: true
})
export class TileIconPipe implements PipeTransform {
  transform(tile: Tile | null): string {
    if (!tile) return '';

    if (tile.category === TileCategory.Number) {
      const suitIcon = this.getSuitIcon(tile.suit);
      return `${tile.rank}${suitIcon}`;
    }

    if (tile.category === TileCategory.Wind) {
      return this.getWindChar(tile.name);
    }

    if (tile.category === TileCategory.Dragon) {
      return this.getDragonChar(tile.name);
    }

    return tile.name;
  }

  private getSuitIcon(suit: TileSuit | undefined): string {
    switch (suit) {
      case TileSuit.Bamboo: return '🎋';
      case TileSuit.Circle: return '⚪';
      case TileSuit.Character: return '萬';
      default: return '';
    }
  }

  private getWindChar(name: string): string {
    if (name.includes('East')) return '東';
    if (name.includes('South')) return '南';
    if (name.includes('West')) return '西';
    if (name.includes('North')) return '北';
    return '🌬️';
  }

  private getDragonChar(name: string): string {
    if (name.includes('Red')) return '中';
    if (name.includes('Green')) return '發';
    if (name.includes('White')) return '🀆'; 
    return '🐲';
  }
}
