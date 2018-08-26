import { Component, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, from, Subscription, combineLatest } from 'rxjs';
import { map, debounceTime, switchMap, filter, tap, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';


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
  private static readonly BatchSize = 10;

  readonly breadcrumbs: IBreadcrumb[] = [
    {
      title: 'Home',
      url: ''
    },
    {
      title: 'Courses',
      url: '/courses'
    }
  ];

  readonly searchSegment$ = new BehaviorSubject('');

  readonly items$ = new BehaviorSubject<ICourse[]>([]);
  readonly dataAvailable$ = this.items$.pipe(map((x) => !!x.length));

  readonly requestNow$ = new BehaviorSubject(true);
  readonly moreAvailable$ = new BehaviorSubject(true);

  private readonly batchesLoaded$ = new BehaviorSubject(0);

  private currentRequestId = 0;

  private searchToVdSubscription: Subscription;
  private searchToBatchNumberSubscription: Subscription;

  constructor(private readonly courserSrv: CoursesService) {
  }

  ngOnInit(): void {
    this.searchToBatchNumberSubscription = this.searchSegment$
    .pipe(distinctUntilChanged())
    .subscribe(() => {
      this.items$.next([]);
      this.batchesLoaded$.next(0);
    });

    this.searchToVdSubscription = combineLatest(
      this.searchSegment$,
      this.batchesLoaded$
    )
    .pipe(
      tap(([textSegment, currentBatch]) => {
        if (currentBatch === 0) {
          this.moreAvailable$.next(true);
        }
      }),
      map(([textSegment, currentBatch]) => ([textSegment, currentBatch, ++this.currentRequestId] as [string, number, number])),
      debounceTime(100),
      tap(() => this.requestNow$.next(true)),
      switchMap(([textSegment, currentBatch, requestId]) => {
        const start = currentBatch * OverviewPageComponent.BatchSize;
        const end = start + OverviewPageComponent.BatchSize;
        return from(this.courserSrv.get(start, end, textSegment))
        .pipe(
          withLatestFrom(of(requestId))
        );
      }),
      filter(([batch, requestId]) => requestId === this.currentRequestId)
    )
    .subscribe(([batch]) => {
      const newItems = this.items$.getValue().slice();
      newItems.push(...batch);
      this.items$.next(newItems);
      this.requestNow$.next(false);
      // full batch received
      this.moreAvailable$.next(batch.length === OverviewPageComponent.BatchSize);
    });
  }

  ngOnDestroy(): void {
    this.searchSegment$.unsubscribe();
    this.items$.unsubscribe();
    this.searchToVdSubscription.unsubscribe();
    this.searchToBatchNumberSubscription.unsubscribe();
    this.requestNow$.unsubscribe();
    this.moreAvailable$.unsubscribe();
    this.batchesLoaded$.unsubscribe();
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
        const indexRemove = this.items$.getValue().findIndex((z) => z.id === x.id);
        const itemVisible = indexRemove !== -1;
        if (itemVisible) {
          const itemsView = this.items$.getValue().slice();
          itemsView.splice(indexRemove, 1);
          this.items$.next(itemsView);
        }
      },
      error: (err) => {
        throw err;
      }
    });
  }

  onLoadMore() {
    this.batchesLoaded$.next(
      this.batchesLoaded$.getValue() + 1
    );
  }

  onSearch(segment: string) {
    // skip form raised event
    if (typeof segment !== 'string') {
      return;
    }

    this.searchSegment$.next(segment);
  }
}
