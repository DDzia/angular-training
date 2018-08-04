import { Route } from '@angular/router';

import { OverviewPageComponent } from './overview-page';
import { LoginPageComponent } from './login-page';
import { AuthGuard } from './auth.guard';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses'
  },
  {
    path: 'courses',
    canActivate: [AuthGuard],
    component: OverviewPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
];
