import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PageComponent } from './page/page.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { LogoComponent } from './logo/logo.component';
import { PageBreadcrumbComponent } from './page-breadcrumb/page-breadcrumb.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { DurationPipe } from './duration-pipe/duration.pipe';
import { TruncateTextPipe } from './truncate-text/truncate-text.pipe';
import { FreshCourseSelectionDirective } from './fresh-course-selection-directive/fresh-course-selection.directive';
import { NoDataForEmptyDirective } from './no-data-for-empty-directive/no-data-for-empty.directive';
import { OrderByPipe } from './order-by-pipe/order-by.pipe';
import { DatePipe } from '@angular/common';


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    FreshCourseSelectionDirective,
    PageComponent,
    PageHeaderComponent,
    PageFooterComponent,
    LogoComponent,
    PageBreadcrumbComponent,
    CourseListItemComponent,
    DurationPipe,
    TruncateTextPipe,
    FreshCourseSelectionDirective,
    NoDataForEmptyDirective,
    NoDataForEmptyDirective,
    OrderByPipe
  ],
  providers: [
    DurationPipe,
    DatePipe
  ],
  exports: [
    PageComponent,
    PageBreadcrumbComponent,
    CourseListItemComponent,
    TruncateTextPipe,
    FreshCourseSelectionDirective,
    NoDataForEmptyDirective,
    OrderByPipe
  ]
})
export class ComponentsModule { }
