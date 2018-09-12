import { AuthInfo } from './auth.reducer';
import { ICourse } from '../models';

export interface AppState {
  authInfo: AuthInfo;
  searchLine: string;
  newCourse: ICourse;
  editCourse: ICourse | undefined;
  courses: ICourse[] | undefined;
}
