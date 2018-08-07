import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { CourseListItemComponent } from './course-list-item.component';
import { ICourse } from '../../models';
import { DurationPipe, TruncateTextPipe } from '../../services';


@Component({
  selector: 'app-test-host',
  template: `
    <app-course-list-item
      [course]="stupidCourse"
      (delete)="onDeleteCourse($event)"
    >
    </app-course-list-item>
  `
})
class TestHostComponent {
  stupidCourse: ICourse = {
    id: 128,
    title: 'title value',
    creationDate: new Date(1992, 8, 12),
    durationMin: 20,
    description: 'some desc',
    topRated: true
  };

  deletedCourse: ICourse;

  onDeleteCourse(toDelete: ICourse) {
    this.deletedCourse = toDelete;
  }
}

describe('CourseListItemComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterModule.forRoot([
          {
            path: '',
            redirectTo: '',
            pathMatch: 'full'
          }
        ]),
        FormsModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
      declarations: [
        TestHostComponent,
        CourseListItemComponent,
        DurationPipe,
        TruncateTextPipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe('rendering tests', () => {

    it('content rendered correctly', () => {
      // arrange
      const titleElem = fixture.debugElement.query(By.css('.title'));
      const durationElem = fixture.debugElement.query(By.css('.duration'));
      const createdElem = fixture.debugElement.query(By.css('.created'));
      const descElem = fixture.debugElement.query(By.css('.desc'));

      // assert
      expect(titleElem.nativeElement.innerText).toBe(component.stupidCourse.title);
      expect(durationElem.nativeElement.innerText).toBe(`0h ${component.stupidCourse.durationMin}min`);
      expect(createdElem.nativeElement.innerText).toBe('12.09.1992');
      expect(descElem.nativeElement.innerText).toBe(component.stupidCourse.description);
    });

  });
});
