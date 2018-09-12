import { AppState } from './state';

import { authReducer } from './auth.reducer';
import { searchReducer } from './search.reducer';
import { newCourseReducer } from './new-course.reducer';
import { editCourseReducer } from './edit-course.reducer';
import { coursesListReducer } from './coursesList.reducer';

export { authReducer };
export * from './state';
export * from './redux-action';

export type ReducersRegistrationType = {
  [key in keyof AppState]: (initState: AppState[key], args: any) => AppState[key]
};


export const reducers: ReducersRegistrationType = {
  authInfo: authReducer,
  searchLine: searchReducer,
  newCourse: newCourseReducer,
  editCourse: editCourseReducer,
  courses: coursesListReducer
};
