import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../reducers';
import { SearchAction } from '../../../actions';

@Component({
  selector: 'app-search-cource-form',
  templateUrl: './search-cource-form.component.html',
  styleUrls: ['./search-cource-form.component.scss']
})
export class SearchCourceFormComponent {
  constructor(private readonly store: Store<AppState>) {
  }

  onSearch(evt: Event) {
    const source = evt.srcElement as HTMLInputElement;

    this.store.dispatch({
      type: SearchAction.searchChanges,
      payload: source.value || ''
    });
  }
}
