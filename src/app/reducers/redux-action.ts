import { Action } from '@ngrx/store';


export interface ReduxAction<TData = undefined> extends Action {
  payload: TData;
}
