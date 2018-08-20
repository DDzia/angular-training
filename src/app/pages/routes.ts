import { Route, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { OverviewPageComponent } from './overview-page';
import { LoginPageComponent } from './login-page';
import { CoursePageComponent } from './course-page';
import { AddCoursePageComponent } from './add-course-page';
import { NotFoundPageComponent } from './not-found-page';

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses'
  },
  {
    path: 'courses',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OverviewPageComponent
      },
      {
        path: 'new',
        component: AddCoursePageComponent
      },
      {
        component: CoursePageComponent,
        // 'courses/<courseId>'
        matcher: (segments) =>
          segments.length === 1 && /^\d+$/.test(segments[0].path) ?
            {
              consumed: segments,
              posParams: {
                id: segments[0]
              }
            } :
            null
      }
    ]
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

const routerModule = RouterModule.forRoot(routes);
export {routerModule as routes};
