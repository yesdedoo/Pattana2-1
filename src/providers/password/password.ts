import { AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

/*
  Generated class for the PasswordProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PasswordProvider {

  constructor(){
    console.log('Re-password Provider')
  }

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password != confirmPassword) {
      console.log('false');
      AC.get('confirmPassword').setErrors({ MatchPassword: true })
    } else {
      console.log('true');
      AC.get('confirmPassword').setErrors(null)
    }
  }
}
