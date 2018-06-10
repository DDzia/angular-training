import { Component, OnInit, Input } from '@angular/core';
import { IBreadcrumb } from './ibreadcrumb';

@Component({
  selector: 'app-page-breadcrumb',
  templateUrl: './page-breadcrumb.component.html',
  styleUrls: ['./page-breadcrumb.component.scss']
})
export class PageBreadcrumbComponent {
  @Input() item: IBreadcrumb;
}
