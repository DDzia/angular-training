import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DdVirtualizedModule } from 'dd-virtualized';

import { ServicesModule } from '../services';
import { ComponentsModule } from '../components';

import { OverviewPageComponent, SearchCourceFormComponent } from './overview-page';
import { LoginPageComponent } from './login-page';
import { routes } from './routes';
import { AuthGuard } from './auth.guard';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    ServicesModule.forRoot(),
    DdVirtualizedModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    OverviewPageComponent,
    SearchCourceFormComponent,
    LoginPageComponent
  ],
  providers: [
    AuthGuard
  ],
  exports: [OverviewPageComponent]
})
export class PagesModule { }
