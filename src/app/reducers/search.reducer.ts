import { ActionReducer } from '@ngrx/store';

import { SearchAction } from '../actions';
import { ReduxAction } from './redux-action';

export const searchReducer: ActionReducer<string, ReduxAction<string>> = (state = '', action) => {
  switch (action.type) {
    case SearchAction.searchChanges:
      return action.payload;
    default:
      return state;
  }
};
