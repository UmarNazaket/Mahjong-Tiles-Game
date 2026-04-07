import { Pipe, PipeTransform } from '@angular/core';
import { Tile } from '../../core/models/tile.model';
import { TileCategory, TileSuit, DragonType, WindType } from '../../core/enums/game.enums';

@Pipe({
  name: 'tileIcon',
  standalone: true
})
export class TileIconPipe implements PipeTransform {

  private readonly bambooIcons: Record<number, string> = {
    1: '🎋', 2: '🎍', 3: '🌿', 4: '🌿', 5: '🌿',
    6: '🌿', 7: '🌿', 8: '🌿', 9: '🌿'
  };

  private readonly circleIcons: Record<number, string> = {
    1: '⚪', 2: '⚪', 3: '⚪', 4: '⚪', 5: '⚪',
    6: '⚪', 7: '⚪', 8: '⚪', 9: '⚪'
  };

  private readonly characterIcons: Record<number, string> = {
    1: '一', 2: '二', 3: '三', 4: '四', 5: '五',
    6: '六', 7: '七', 8: '八', 9: '九'
  };

  transform(tile: Tile): string {
    if (tile.category === TileCategory.Number && tile.rank) {
      if (tile.suit === TileSuit.Bamboo) return `🎋`;
      if (tile.suit === TileSuit.Circle) return `🔵`;
      if (tile.suit === TileSuit.Character) return this.characterIcons[tile.rank] || '万';
    } else if (tile.category === TileCategory.Wind) {
      if (tile.name.includes(WindType.East)) return '🀀';
      if (tile.name.includes(WindType.South)) return '🀁';
      if (tile.name.includes(WindType.West)) return '🀂';
      if (tile.name.includes(WindType.North)) return '🀃';
    } else if (tile.category === TileCategory.Dragon) {
      if (tile.name.includes(DragonType.Red)) return '🀄';
      if (tile.name.includes(DragonType.Green)) return '🀅';
      if (tile.name.includes(DragonType.White)) return '🀆';
    }
    
    return '🀫';
  }
}
