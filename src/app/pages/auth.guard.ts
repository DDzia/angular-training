import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../contracts/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly authSrv: AuthService, private readonly router: Router) {
  }

  canActivate() {
    this.router.navigate(['/login']);
    return this.authSrv.authenticated;
  }
}
