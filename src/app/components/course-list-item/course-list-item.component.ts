import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ICourse } from '../../models/course';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss']
})
export class CourseListItemComponent {
  @Input() course: ICourse;

  @Output() delete = new EventEmitter<ICourse>();

  onDeleteBtnClick() {
    this.delete.emit(this.course);
  }

  onEditCourse() {
    console.log(`edit course with ID: ${this.course.id}`);
  }
}
