import { Component, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';


@Component({
  selector: 'app-search-cource-form',
  templateUrl: './search-cource-form.component.html',
  styleUrls: ['./search-cource-form.component.scss']
})
export class SearchCourceFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('input')
  readonly input: ElementRef<HTMLInputElement>;

  @Output() readonly search = new EventEmitter<string>();

  private inputSubscribtion?: Subscription;

  ngAfterViewInit(): void {
    this.inputSubscribtion = fromEvent(this.input.nativeElement, 'input')
    .pipe(
      pluck('target', 'value'),
      tap((x) => console.log(`on search: '${x}'`))
    )
    .subscribe(this.search);
  }

  ngOnDestroy(): void {
    if (this.inputSubscribtion) {
      this.inputSubscribtion.unsubscribe();
    }
  }
}
