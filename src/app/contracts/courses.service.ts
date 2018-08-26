import { ICourse } from '../models/course';

export abstract class CoursesService {
  abstract get(start: number, count: number, textFragment: string): Promise<ICourse[]>;
  abstract create(courseNew: ICourse): Promise<ICourse>;
  abstract getById(id: number): Promise<ICourse | undefined>;
  abstract update(courseNew: ICourse): Promise<ICourse>;
  abstract remove(id: number): Promise<ICourse>;
}
