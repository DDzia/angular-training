import { Component, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, from, Subscription, combineLatest } from 'rxjs';
import { map, debounceTime, switchMap, filter, tap, withLatestFrom, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';


import { IBreadcrumb } from '../../components';
import { ICourse } from '../../models';
import { CoursesService } from '../../contracts';
import { AppState } from '../../reducers';
import { CoursesListAction } from '../../actions';


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

  readonly items$: Observable<ICourse[] | undefined>;
  readonly dataAvailable$: Observable<boolean>;

  readonly requestNow$ = new BehaviorSubject(true);
  readonly moreAvailable$ = new BehaviorSubject(true);

  private readonly batchesLoaded$ = new BehaviorSubject(0);

  private currentRequestId = 0;

  private searchToVdSubscription: Subscription;
  private searchToBatchNumberSubscription: Subscription;

  private itemsArray?: ICourse[];

  constructor(private readonly courserSrv: CoursesService, private readonly store: Store<AppState>) {
    this.items$ = this.store.select((x) => x.courses)
    .pipe(
      map((x) => this.itemsArray = x)
    );

    this.dataAvailable$ = this.items$.pipe(map((x) => !!x.length));
  }

  ngOnInit(): void {
    this.searchToBatchNumberSubscription = this.store.select((x) => x.searchLine)
    .pipe(
      filter((x) => !!(x.length === 0 || x.length >= 3)),
      distinctUntilChanged()
    )
    .subscribe(() => {
      this.store.dispatch({ type: CoursesListAction.updateList, payload: [] });
      this.batchesLoaded$.next(0);
    });

    this.searchToVdSubscription = combineLatest(
      this.store.select((x) => x.searchLine),
      this.batchesLoaded$,
    )
    .pipe(
      filter(([textSegment, loadedBatches]) => !!(textSegment.length === 0 || textSegment.length >= 3 )),
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
      const newList = this.itemsArray.slice();
      newList.push(...batch);

      this.store.dispatch({ type: CoursesListAction.updateList, payload: newList });

      this.requestNow$.next(false);
      // full batch received
      this.moreAvailable$.next(batch.length === OverviewPageComponent.BatchSize);
    });
  }

  ngOnDestroy(): void {
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
        const indexRemove = this.itemsArray.findIndex((z) => z.id === x.id);
        const itemVisible = indexRemove !== -1;
        if (itemVisible) {
          const itemsView = this.itemsArray.slice();
          itemsView.splice(indexRemove, 1);

          this.store.dispatch({ type: CoursesListAction.updateList, payload: itemsView });
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
}
