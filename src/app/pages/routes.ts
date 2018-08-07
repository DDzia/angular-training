import { Route } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { OverviewPageComponent } from './overview-page';
import { LoginPageComponent } from './login-page';
import { CoursePageComponent } from './course-page';

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
    path: 'courses/:id',
    canActivate: [AuthGuard],
    component: CoursePageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
];
