import { Component, OnInit, ContentChildren, QueryList, ViewEncapsulation } from '@angular/core';

import { PageBreadcrumbComponent } from '../page-breadcrumb/page-breadcrumb.component';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageComponent {
  @ContentChildren(PageBreadcrumbComponent)
  breadcrumbs: QueryList<PageBreadcrumbComponent>;
}
