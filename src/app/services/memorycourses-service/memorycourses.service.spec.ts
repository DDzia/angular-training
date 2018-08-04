import { TestBed, inject } from '@angular/core/testing';
import { CommonModule, DatePipe } from '@angular/common';

import { MemoryCoursesService } from './memorycourses.service';
import { DurationPipe } from '../duration-pipe';

describe('MemcoursesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      providers: [
        DurationPipe,
        DatePipe,
        MemoryCoursesService
      ]
    });
  });

  it('should be created', inject([MemoryCoursesService], (service: MemoryCoursesService) => {
    expect(service).toBeTruthy();
  }));
});
