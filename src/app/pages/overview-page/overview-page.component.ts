import { Component, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, from, Subscription } from 'rxjs';
import { map, debounceTime, switchMap, filter } from 'rxjs/operators';


import { IBreadcrumb } from '../../components';
import { ICourse } from '../../models';
import { CoursesService } from '../../contracts';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OverviewPageComponent implements OnInit, OnDestroy {
  readonly breadcrumbs: IBreadcrumb[] = [
    {
      title: 'Home',
      url: ''
    },
    {
      title: 'Overview',
      url: ''
    }
  ];

  readonly searchSegment$ = new BehaviorSubject('');
  readonly viewItems$ = new BehaviorSubject<ICourse[]>([]);
  private searchToVdSubscription: Subscription;
  readonly dataAvailable$ = this.viewItems$.pipe(map((x) => !!x.length));

  constructor(private readonly courserSrv: CoursesService) {
  }

  ngOnInit(): void {
    this.searchToVdSubscription = this.searchSegment$
    .pipe(
      debounceTime(100),
      switchMap((x) => from( x !== '' ? this.courserSrv.filter(x) : this.courserSrv.get()))
    )
    .subscribe(this.viewItems$);
  }

  ngOnDestroy(): void {
    this.searchSegment$.unsubscribe();
    this.viewItems$.unsubscribe();
    this.searchToVdSubscription.unsubscribe();
  }

  onDeleteCourse(courceToDelete: ICourse) {
    of(null)
    .pipe(
      filter(() => {
        const respond = window.confirm('Do you really want to delete this course?');
        return respond;
      }),
      switchMap(() => from(this.courserSrv.remove(courceToDelete.id)))
    )
    .subscribe({
      next: (x) => {
        const indexRemove = this.viewItems$.getValue().findIndex((z) => z.id === x.id);
        const itemVisible = indexRemove !== -1;
        if (itemVisible) {
          const itemsView = this.viewItems$.getValue().slice();
          itemsView.splice(indexRemove, 1);
          this.viewItems$.next(itemsView);
        }
      },
      error: (err) => {
        throw err;
      }
    });
  }

  onLoadMore() {
    console.log('load more click');
  }

  onSearch(segment: string) {
    // skip form raised event
    if (typeof segment !== 'string') {
      return;
    }

    this.searchSegment$.next(segment);
  }
}
