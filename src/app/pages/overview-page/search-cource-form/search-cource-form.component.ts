import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../../reducers';
import { SearchAction } from '../../../actions';


@Component({
  selector: 'app-search-cource-form',
  templateUrl: './search-cource-form.component.html',
  styleUrls: ['./search-cource-form.component.scss']
})
export class SearchCourceFormComponent implements OnInit, OnDestroy {
  private valueInternal = '';
  get value() {
    return this.valueInternal;
  }
  set value(x: string) {
    this.store.dispatch({
      type: SearchAction.searchChanges,
      payload: x || ''
    });
  }

  private searchSubscription?: Subscription;

  constructor(private readonly store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.searchSubscription = this.store.select((x) => (x.searchLine || ''))
    .subscribe((x) => this.valueInternal = x);
  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
      this.searchSubscription = undefined;
    }
  }
}
