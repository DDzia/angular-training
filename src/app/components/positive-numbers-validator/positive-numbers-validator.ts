import { AbstractControl, ValidatorFn } from '@angular/forms';

export const positiveNumbersValidator: ValidatorFn = (control: AbstractControl) => {
  const re = /^\d+$/i;
  return control.value && re.test(control.value) ?
    null :
    { positiveNumbers: control.value };
};
