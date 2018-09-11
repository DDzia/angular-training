import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../contracts';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  uName = '';
  pwd = '';

  constructor(private readonly authSrv: AuthService, private readonly router: Router) { }

  login() {
    this.authSrv.login(
      this.uName,
      this.pwd
    )
    .then(() => this.router.navigateByUrl(''));
  }
}
