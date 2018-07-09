import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(data: any[], property?: string): any {
    const copy = data.slice();
    copy.sort((f: any, s: any) => {
      const fValue = property === undefined ?
        f :
        f[property];

      const sValue = property === undefined ?
        s :
        s[property];

      if (fValue > sValue) {
        return 1;
      } else if (fValue < sValue) {
        return -1;
      } else {
        return 0;
      }
    });

    return copy;
  }
}
