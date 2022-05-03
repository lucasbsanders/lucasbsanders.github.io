import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rowSplit'
})
export class RowSplitPipe implements PipeTransform {

  transform(input: any[], partsPerRow: number): any[][] {
    return input.reduce((previous, current, index) => {
      if (index % partsPerRow === 0)
        previous.push([current]);
      else
        previous[previous.length - 1].push(current);
      return previous;
    }, <any[][]>[]);
  }

}