import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

import { ICourse } from '../../models/course';

enum SelectionColor {
  fresh = 'green',
  upcoming = 'blue'
}

@Directive({
  selector: `[${FreshCourseSelectionDirective.selector}]`
})
export class FreshCourseSelectionDirective implements OnInit {
  private static readonly selector = 'appFreshCourseSelection';

  private static readonly now = new Date();

  private static readonly twoWeeksAgo = new Date(
    FreshCourseSelectionDirective.now.getFullYear(),
    FreshCourseSelectionDirective.now.getMonth(),
    FreshCourseSelectionDirective.now.getDate()
  );


  // tslint:disable-next-line:no-input-rename
  @Input(FreshCourseSelectionDirective.selector) course: ICourse;

  constructor(private readonly ref: ElementRef,
              private readonly renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (this.course.creationDate > FreshCourseSelectionDirective.now &&
         this.course.creationDate >= FreshCourseSelectionDirective.twoWeeksAgo) {
      this.renderer.setStyle(this.ref.nativeElement, 'border', `1px solid ${SelectionColor.fresh}`);
    } else if (this.course.creationDate > FreshCourseSelectionDirective.now) {
      this.renderer.setStyle(this.ref.nativeElement, 'border', `1px solid ${SelectionColor.upcoming}`);
    }
  }
}
