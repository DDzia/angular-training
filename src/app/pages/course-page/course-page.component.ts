import { Component, OnInit, NgZone } from '@angular/core';

import { ICourse } from '../../models';
import { CoursesService } from '../../contracts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  private readonly courseId: number;

  process = false;

  course: ICourse;
  private origin: ICourse;

  constructor(private readonly courseSrv: CoursesService,
              route: ActivatedRoute,
              private zone: NgZone) {
    this.courseId = Number(route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.courseSrv.getById(this.courseId)
      .then((x) => this.zone.runOutsideAngular(() => this.origin = x))
      .then(() => this.resetToDefault());
  }

  async saveChanges() {
    this.process = true;

    this.zone.runOutsideAngular(async () => {
      await this.courseSrv.update(this.course);
      this.origin = this.course;
    })
    .then(() => {
      this.resetToDefault();
      this.process = false;
    });
  }

  resetToDefault() {
    this.course = this.copyCourse(this.origin);
  }

  private copyCourse(x: ICourse) {
    const copy: any = {};
    Object.keys(x).forEach((key) => copy[key] = (x as any)[key]);

    (copy as ICourse).creationDate = new Date();

    return copy;
  }
}
