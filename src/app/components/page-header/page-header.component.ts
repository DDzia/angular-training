import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../contracts';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  readonly loginUrl = '/login';
  get isLoginPage() {
    return this.router.url === this.loginUrl;
  }

  constructor(readonly authSrv: AuthService, private readonly router: Router) { }

  logout() {
    this.authSrv.logout();
    this.router.navigateByUrl(this.loginUrl);
  }
}
