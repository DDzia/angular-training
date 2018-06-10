import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PageComponent } from './page/page.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { LogoComponent } from './logo/logo.component';
import { PageBreadcrumbComponent } from './page-breadcrumb/page-breadcrumb.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { MinPostfixPipe } from './min-postfix-pipe/min-postfix.pipe';
import { TruncateTextPipe } from './truncate-text/truncate-text.pipe';


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    PageComponent,
    PageHeaderComponent,
    PageFooterComponent,
    LogoComponent,
    PageBreadcrumbComponent,
    CourseListItemComponent,
    MinPostfixPipe,
    TruncateTextPipe
  ],
  exports: [
    PageComponent,
    PageBreadcrumbComponent,
    CourseListItemComponent,
    TruncateTextPipe
  ]
})
export class ComponentsModule { }
