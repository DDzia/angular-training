import { ActionReducer } from '@ngrx/store';

import { EditCourseAction } from '../actions';
import { ReduxAction } from './redux-action';
import { ICourse } from '../models';

type StateType = ICourse | undefined;

export const editCourseReducer: ActionReducer<StateType, ReduxAction<StateType>> = (state = undefined, action) => {
  switch (action.type) {
    case EditCourseAction.updateExistCourse:
      return action.payload;
    case EditCourseAction.resetEditCourse:
      return undefined;
    default:
      return state;
  }
};
