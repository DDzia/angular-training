import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { ICourse } from '../../models';
import { CoursesService } from '../../contracts';
import { IBreadcrumb } from '../../components';


@Component({
  selector: 'app-course-page',
  templateUrl: './add-course-page.component.html',
  styleUrls: ['./add-course-page.component.scss']
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
  course = this.createEmptyCourse();

  constructor(private readonly courseSrv: CoursesService,
              private readonly zone: NgZone,
              private readonly router: Router) {
  }

  saveChanges() {
    this.process = true;
    this.zone.runOutsideAngular(async () => await this.courseSrv.create(this.course))
      .then(() => this.goToList());
  }

  goToList() {
    this.router.navigate(['courses']);
  }

  private createEmptyCourse(): ICourse {
    const now = new Date();
    return {
      id: now.getTime(),
      title: '',
      creationDate: new Date(),
      durationMin: 0,
      description: '',
      topRated: false
    };
  }
}
