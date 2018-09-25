import { from } from 'rxjs';
import { tap, switchMap, first, map, filter } from 'rxjs/operators';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CoursesService } from '../../contracts';
import { IBreadcrumb, dateFormatValidator, positiveNumbersValidator } from '../../components';



@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  breadcrumbs?: IBreadcrumb[] = [];
  process = false;

  readonly fm: FormGroup;

  constructor(private readonly courseSrv: CoursesService,
              private readonly route: ActivatedRoute,
              private readonly zone: NgZone,
              private readonly router: Router) {
    this.fm = new FormGroup({
      id: new FormControl(0),
      topRated: new FormControl(false),
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
      )
    });
  }

  ngOnInit() {

    this.route.paramMap
    .pipe(
      map((p) => Number(p.get('id'))),
      switchMap((id) => from(this.courseSrv.getById(id))),
      tap((x) => {
        if (x) {
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
        }
      }),
      filter((x) => !!x),
      first()
    )
    .subscribe((x) => {
      this.fm.controls.title.setValue(x.id);
      this.fm.controls.title.setValue(x.topRated);
      this.fm.controls.title.setValue(x.title);
      this.fm.controls.description.setValue(x.description);
      const dt: Date = x.creationDate;

      let dayStr = dt.getDate().toString();
      dayStr = dayStr.length === 1 ? `0${dayStr}` : dayStr;

      let monthStr = dt.getMonth().toString();
      monthStr = monthStr.length === 1 ? `0${monthStr}` : monthStr;

      this.fm.controls.creationDate.setValue(`${dayStr}/${monthStr}/${dt.getFullYear()}`);
      this.fm.controls.durationMin.setValue(x.durationMin);
    });
  }

  saveChanges() {
    this.process = true;

    this.zone.runOutsideAngular(async () => await this.courseSrv.update(this.fm.value))
      .then(() => this.goToList());
  }

  goToList() {
    this.router.navigate(['courses']);
  }
}
