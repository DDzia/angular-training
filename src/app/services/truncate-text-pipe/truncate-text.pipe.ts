import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  pure: true
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: any, count?: number): any {
    if (typeof value !== 'string') {
      return value;
    }

    let words = value.split(' ');
    if (words.length > count) {
      words = words.slice(0, count);
      words.push('...');
      return words.join(' ');
    }

    return value;
  }

}
