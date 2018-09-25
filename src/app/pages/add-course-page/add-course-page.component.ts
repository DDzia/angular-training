import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBreadcrumb, dateFormatValidator, positiveNumbersValidator } from '../../components';

import { CoursesService } from '../../contracts';

@Component({
  selector: 'app-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss'],
})
export class AddCoursePageComponent {
  breadcrumbs?: IBreadcrumb[] = [
    {
      title: 'Home',
      url: ''
    },
    {
      title: 'Courses',
      url: '/courses'
    },
    {
      title: 'Create',
      url: '/courses/new'
    }
  ];
  process = false;

  readonly fm: FormGroup;

  constructor(private readonly courseSrv: CoursesService,
              private readonly zone: NgZone,
              private readonly router: Router) {

    this.fm = new FormGroup({
      title: new FormControl(
        '', [
          Validators.required,
          Validators.max(50)
        ]
      ),
      description: new FormControl(
        '', [
          Validators.required,
          Validators.max(500),
        ]
      ),
      creationDate: new FormControl(
        null, [
          Validators.required,
          dateFormatValidator
        ]
      ),
      durationMin: new FormControl(
        null, [
          Validators.required,
          positiveNumbersValidator
        ]
      ),
      authors: new FormControl(null, Validators.required)
    });
  }

  saveChanges() {
    this.process = true;

    this.zone.runOutsideAngular(async () => await this.courseSrv.create(this.fm.value))
      .then(() => this.goToList());
  }

  goToList() {
    this.router.navigate(['courses']);
  }
}

