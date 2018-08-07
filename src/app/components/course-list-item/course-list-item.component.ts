import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { ICourse } from '../../models/course';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListItemComponent {
  @Input() course: ICourse;

  @Output() delete = new EventEmitter<ICourse>();

  onDeleteBtnClick() {
    this.delete.emit(this.course);
  }
}
