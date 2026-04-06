import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tileIcon',
})
export class TileIconPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
