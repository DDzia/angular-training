import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';

import { AuthService } from '../contracts/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly authSrv: AuthService, private readonly router: Router) {
  }

  canActivate() {
    return this.authSrv.userInfo$.pipe(map((x) => !!x))
    .pipe(
      tap((x) => !x && this.router.navigate(['/login']))
    );
  }
}
