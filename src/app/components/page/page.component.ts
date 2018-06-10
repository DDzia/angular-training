import { Component, OnInit, ContentChildren, QueryList, OnDestroy, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { PageBreadcrumbComponent } from '../page-breadcrumb/page-breadcrumb.component';
import { IBreadcrumb } from '../page-breadcrumb/ibreadcrumb';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageComponent implements AfterContentInit, OnDestroy {

  @ContentChildren(PageBreadcrumbComponent)
  breadcrumbs: QueryList<PageBreadcrumbComponent>;

  constructor() { }

  ngAfterContentInit(): void {
    // this.breadcrumbItems.subscribe((x) => this.count = x.length);
  }

  ngOnDestroy(): void {
    // this.breadcrumbItems.unsubscribe();
  }
}
