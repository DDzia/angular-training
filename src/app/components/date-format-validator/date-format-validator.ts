import { AbstractControl, ValidatorFn } from '@angular/forms';

export const dateFormatValidator: ValidatorFn = (control: AbstractControl) => {
  const re = /^\d{2}\/\d{2}\/\d{4}$/i;
  return control.value && re.test(control.value) ?
    null :
    { dateFormat: control.value };
};
