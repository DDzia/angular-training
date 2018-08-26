import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs/operators';

import { CoursesService } from '../../contracts';
import { ICourse, Course } from '../../models';
import { CourseDto } from './course.dto';
import { DurationPipe } from '../duration-pipe';



@Injectable()
export class RemoteCoursesService implements CoursesService {

  constructor(@Inject('remoteHost') private readonly remoteHost: string,
              private readonly durationPipe: DurationPipe,
              private readonly dtPipe: DatePipe,
              private readonly http: HttpClient) { }

  get(start: number, count: number, textFragment: string): Promise<ICourse[]> {
    const url = `${this.remoteHost}/courses?start=${start}&count=${count}&textFragment=${textFragment}`;

    return this.http.get<CourseDto[]>(url)
    .pipe(
      map((x) => this.mapToCourse(x))
    )
    .toPromise();
  }

  create(courseNew: ICourse): Promise<ICourse> {
    throw new Error('Method not implemented.');
  }

  async getById(id: number) {
    return (await this.get(0, Number.MAX_SAFE_INTEGER, '')).find((x) => x.id === id);
  }

  update(courseNew: ICourse): Promise<ICourse> {
    throw new Error('Method not implemented.');
  }

  remove(id: number) {
    return this.getById(id);
  }

  private mapToCourse(dto: CourseDto[]): Course[];
  private mapToCourse(dto: CourseDto): Course;
  private mapToCourse(dto: CourseDto | CourseDto[]) {
    if (Array.isArray(dto)) {
      return dto.map((x) => this.mapToCourse(x));
    }

    return {
      id: dto.id,
      title: dto.name,
      description: dto.description,
      topRated: dto.isTopRated,
      creationDate: new Date(Date.parse(dto.date)),
      durationMin: dto.length
    };
  }
}
