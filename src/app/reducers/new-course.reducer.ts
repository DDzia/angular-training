import { ActionReducer } from '@ngrx/store';

import { NewCourseAction } from '../actions';
import { ReduxAction } from './redux-action';
import { ICourse } from '../models';

const createEmptyCourse = () => {
  const now = new Date();
  return {
    id: now.getTime(),
    title: '',
    creationDate: new Date(),
    durationMin: 0,
    description: '',
    topRated: false
  };
};


export const newCourseReducer: ActionReducer<ICourse, ReduxAction<ICourse>> = (state = createEmptyCourse(), action) => {
  switch (action.type) {
    case NewCourseAction.updateNewCourse:
      return action.payload;
    case NewCourseAction.resetNewCourse:
      return createEmptyCourse();
    default:
      return state;
  }
};
