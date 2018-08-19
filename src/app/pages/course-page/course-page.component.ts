import { BehaviorSubject, from, Subscription } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ICourse } from '../../models';
import { CoursesService } from '../../contracts';
import { IBreadcrumb } from '../../components';


@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit, OnDestroy {
  breadcrumbs?: IBreadcrumb[] = [];
  process = false;
  course?: ICourse;

  private readonly courseId = new BehaviorSubject<number>(0);
  private origin = new BehaviorSubject<ICourse | undefined>(undefined);

  private routeParamsSubscription: Subscription;
  private courseIdSubscription: Subscription;
  private originSubscription: Subscription;

  constructor(private readonly courseSrv: CoursesService,
              private readonly route: ActivatedRoute,
              private readonly zone: NgZone,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.routeParamsSubscription = this.route.paramMap
    .subscribe(p => this.courseId.next(Number(p.get('id'))));

    this.courseIdSubscription = this.courseId
    .pipe(
      tap(() => this.origin.next(undefined)),
      switchMap((id) => from(this.courseSrv.getById(id))),
    )
    .subscribe(this.origin);

    this.originSubscription = this.origin
    .subscribe((x) => {
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
        this.course = undefined;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
    this.courseIdSubscription.unsubscribe();
    this.originSubscription.unsubscribe();

    this.courseId.unsubscribe();
    this.origin.unsubscribe();
  }

  saveChanges() {
    this.process = true;

    this.zone.runOutsideAngular(async () => await this.courseSrv.update(this.course))
      .then(() => this.goToList());
  }

  goToList() {
    this.router.navigate(['courses']);
  }

  private cloneOrigin(o: ICourse) {
    const clone: any = {...o};
    (clone as ICourse).creationDate = new Date();
    this.course = clone;
  }
}
