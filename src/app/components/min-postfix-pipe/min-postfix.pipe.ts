import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'minPostfix' })
export class MinPostfixPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return (value && `${value.toString()}min`) || '';
  }
}
