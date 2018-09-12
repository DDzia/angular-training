import { ActionReducer } from '@ngrx/store';

import { CoursesListAction } from '../actions';
import { ReduxAction } from './redux-action';
import { ICourse } from '../models/course';

type StateType = ICourse[] | undefined;

export const coursesListReducer: ActionReducer<StateType, ReduxAction<StateType>> = (state = undefined, action) => {
  switch (action.type) {
    case CoursesListAction.updateList:
      return action.payload;
    default:
      return state;
  }
};
