import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minPostfix',
  pure: true
})
export class MinPostfixPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return typeof value === 'number' && !Number.isNaN(value) ?
      `${value.toString()}min` :
      value;
  }
}
