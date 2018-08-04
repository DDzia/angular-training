import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesService, AuthService } from '../contracts';

import { DurationPipe } from './duration-pipe';
import { OrderByPipe } from './order-by-pipe';
import { TruncateTextPipe } from './truncate-text-pipe';
import { MemoryCoursesService } from './memorycourses-service';
import { LocalAuthService } from './auth-service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DurationPipe,
    OrderByPipe,
    TruncateTextPipe
  ],
  providers: [
    {
      provide: CoursesService,
      useClass: MemoryCoursesService
    },
    DurationPipe,
    OrderByPipe,
    TruncateTextPipe
  ],
  exports: [
    DurationPipe,
    OrderByPipe,
    TruncateTextPipe
  ]
})
export class ServicesModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ServicesModule,
      providers: [
        {
          provide: AuthService, useClass: LocalAuthService
        }
      ]
    };
  }
}
