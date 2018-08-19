import { Component, OnInit } from '@angular/core';

import { IBreadcrumb } from '../../components';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent {
  readonly breadcrumbs: IBreadcrumb[] = [
    {
      title: 'Home',
      url: ''
    }
  ];
}
