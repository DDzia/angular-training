import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ServicesModule } from '../services';
import { ComponentsModule } from '../components';

import { OverviewPageComponent, SearchCourceFormComponent } from './overview-page';
import { LoginPageComponent } from './login-page';
import { routes } from './routes';
import { AuthGuard } from './auth.guard';
import { CoursePageComponent } from './course-page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    ServicesModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  declarations: [
    OverviewPageComponent,
    SearchCourceFormComponent,
    LoginPageComponent,
    CoursePageComponent
  ],
  providers: [
    AuthGuard
  ],
  exports: [
    OverviewPageComponent,
    RouterModule
  ]
})
export class PagesModule { }
