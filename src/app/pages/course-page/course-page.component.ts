import { from, Subscription, Observable, Subject } from 'rxjs';
import { tap, switchMap, first, map, multicast } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICourse } from '../../models';
import { CoursesService } from '../../contracts';
import { IBreadcrumb } from '../../components';
import { AppState } from '../../reducers';
import { EditCourseAction, NewCourseAction } from '../../actions';


@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit, OnDestroy {
  breadcrumbs?: IBreadcrumb[] = [];
  process = false;
  private courseInternal?: ICourse;

  private courseId$: Observable<number>;
  private course$: Observable<ICourse | undefined>;

  constructor(private readonly courseSrv: CoursesService,
              private readonly route: ActivatedRoute,
              private readonly zone: NgZone,
              private readonly router: Router,
              private readonly store: Store<AppState>) {
  }

  ngOnInit() {
    this.course$ = this.store.select((x) => x.editCourse)
    .pipe(
      tap((x) => {
        if (x) {
          this.cloneOrigin(x);
          this.breadcrumbs = [
            {
              title: 'Home',
              url: ''
            },
            {
              title: x.title
            }
          ];
        } else {
          this.process = false;
          this.breadcrumbs = undefined;
          this.courseInternal = undefined;
        }
      })
    );

    this.courseId$ = this.route.paramMap
    .pipe(
      map((p) => Number(p.get('id'))),
      first(),
    );

    this.courseId$
    .pipe(
      switchMap((id) => from(this.courseSrv.getById(id))),
      first()
    )
    .subscribe((x) => this.store.dispatch({ type: EditCourseAction.updateExistCourse, payload: x }));
  }

  ngOnDestroy(): void {
    this.store.dispatch({ type: EditCourseAction.resetEditCourse });
  }

  saveChanges() {
    this.process = true;

    this.zone.runOutsideAngular(async () => await this.courseSrv.update(this.courseInternal))
      .then(() => this.goToList());
  }

  goToList() {
    this.router.navigate(['courses']);
  }

  private cloneOrigin(o: ICourse) {
    const clone: any = {...o};
    (clone as ICourse).creationDate = new Date();
    this.courseInternal = clone;
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
