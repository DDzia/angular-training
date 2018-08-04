import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../contracts';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  readonly loginUrl = '/login';
  get isLoginPage() {
    return this.router.url === this.loginUrl;
  }

  get authenticated() {
    return this.authSrv.authenticated;
  }

  private uName?: string;

  constructor(private readonly authSrv: AuthService, private readonly router: Router) { }

  ngOnInit() {
    if (this.authenticated) {
      this.authSrv.getUserInfo()
        .then((x) => this.uName = x);
    }
  }

  logout() {
    this.authSrv.logout();
    this.router.navigateByUrl(this.loginUrl);
  }
}
