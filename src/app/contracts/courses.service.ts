import { ICourse } from '../models/course';

export abstract class CoursesService {
  abstract get(): Promise<ICourse[]>;
  abstract create(courseNew: ICourse): Promise<ICourse>;
  abstract getById(id: number): Promise<ICourse | undefined>;
  abstract update(courseNew: ICourse): Promise<ICourse>;
  abstract remove(id: number): Promise<ICourse>;
  abstract filter(segment: string): Promise<ICourse[]>;
}
