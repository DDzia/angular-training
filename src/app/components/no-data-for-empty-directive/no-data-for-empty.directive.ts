import { Directive, TemplateRef, ViewContainerRef, OnDestroy, Input, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, Subscription, isObservable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

@Directive({
  selector: `[${NoDataForEmptyDirective.directiveName}]`
})
export class NoDataForEmptyDirective implements OnInit, OnDestroy {
  private static readonly directiveName = 'appNoDataForEmpty';

  private dataInputSubscribtion?: Subscription;
  private availableSubscribtion: Subscription;

  private readonly dataInternal$ = new BehaviorSubject<any[]>([]);
  private dataAvailable$ = this.dataInternal$.pipe(
    map((x) => !!x.length),
    distinctUntilChanged()
  );

  @Input(NoDataForEmptyDirective.directiveName) set data(input: any[] | Observable<any[]>) {
    if (isObservable(input)) {
      this.subscribeInput(input);
    } else {
      this.dataInternal$.next(input);
    }
  }

  constructor(private readonly tRef: TemplateRef<any>, private readonly vcRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.availableSubscribtion = this.dataAvailable$.subscribe((available) => {
      if (available) {
        this.vcRef.createEmbeddedView(this.tRef);
      } else {
        this.vcRef.clear();
      }
    });
  }

  ngOnDestroy(): void {
    this.dataInternal$.unsubscribe();
    this.availableSubscribtion.unsubscribe();
  }

  private subscribeInput(input: Observable<any[]>) {
    this.unsubscribeInput();

    this.dataInputSubscribtion = input.subscribe(this.dataInternal$);
  }

  private unsubscribeInput() {
    if (this.dataInputSubscribtion) {
      this.dataInputSubscribtion.unsubscribe();
      this.dataInputSubscribtion = undefined;
    }
  }
}
