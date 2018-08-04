import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  pure: true
})
export class DurationPipe implements PipeTransform {
  transform(value: number) {
    if (typeof value === 'number' && !Number.isNaN(value)) {
      const hours = Math.floor(value / 60);
      const minutes = Math.floor(value % 60);

      return `${hours}h ${minutes}min`;
    }

    return value;
  }
}
