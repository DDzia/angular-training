import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ICourse } from '../../models';
import { CoursesService } from '../../contracts';
import { IBreadcrumb } from '../../components';
import { AppState } from '../../reducers';
import { NewCourseAction } from '../../actions';

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
  course$: Observable<ICourse>;

  private courseInternal?: ICourse;

  constructor(private readonly courseSrv: CoursesService,
              private readonly zone: NgZone,
              private readonly router: Router,
              private readonly store: Store<AppState>) {
      this.course$ = store.select((x) => x.newCourse)
      .pipe(
        tap((x) => this.courseInternal = x)
      );
  }

  saveChanges() {
    this.process = true;
    this.zone.runOutsideAngular(async () => await this.courseSrv.create(this.courseInternal))
      .then(() => this.store.dispatch({ type: NewCourseAction.resetNewCourse }))
      .then(() => this.goToList());
  }

  goToList() {
    this.router.navigate(['courses']);
  }

  updateStore(value: any, property: string) {
    this.store.dispatch({
      type: NewCourseAction.updateNewCourse,
      payload: {
        ...this.courseInternal,
        [property]: value
      }
    });
  }
}
