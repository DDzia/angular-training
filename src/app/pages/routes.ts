import { Route } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { OverviewPageComponent } from './overview-page';
import { LoginPageComponent } from './login-page';
import { CoursePageComponent } from './course-page';
import { AddCoursePageComponent } from './add-course-page';
import { NotFoundPageComponent } from './not-found-page';

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
    path: 'courses/new',
    canActivate: [AuthGuard],
    component: AddCoursePageComponent
  },
  {
    canActivate: [AuthGuard],
    component: CoursePageComponent,
    // 'courses/:id'
    matcher: (segments) =>
      (
        segments.length === 2 &&
        segments[0].path.toLowerCase() === 'courses' &&
        /^\d+$/.test(segments[1].path)
      ) ?
        { consumed: segments } :
        null
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
