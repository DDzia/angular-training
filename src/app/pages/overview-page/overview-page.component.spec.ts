import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';

import { DdVirtualizedModule } from 'dd-virtualized';

import { ComponentsModule } from '../../components';
import { SearchCourceFormComponent } from './search-cource-form/search-cource-form.component';
import { OverviewPageComponent } from './overview-page.component';

class TestUtils {
  public static delay(ms = 200) {
    return new Promise((r) => setTimeout(r, ms));
  }
  private constructor() {}
}


describe('OverviewPageComponent', () => {
  let component: OverviewPageComponent;
  let fixture: ComponentFixture<OverviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        ComponentsModule,
        DdVirtualizedModule
      ],
      declarations: [
        SearchCourceFormComponent,
        OverviewPageComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit', () => {
    // act
    fixture.detectChanges();

    // assert
    expect(component.items$.getValue().length).toBe(1000);
  });

  it('load more handler has been called', () => {
    // arrange
    const onLoadSpy = spyOn(component, 'onLoadMore');
    const moreBtn = fixture.debugElement.query(By.css('.more-btn-layout button'));

    // act
    moreBtn.triggerEventHandler('click', null);

    // assert
    expect(!!onLoadSpy.calls.count()).toBeTruthy();
  });

  it('item has been removed', async () => {
    // arrange
    const realDelHandler = component.onDeleteCourse;
    const onDeleteCourseSpy = spyOn(component, 'onDeleteCourse').and.callFake((...args: any[]) => {
      realDelHandler.apply(component, args);
      fixture.detectChanges();
    });
    // create delay for a resize tracking feature of virtualized list
    await TestUtils.delay();
    fixture.detectChanges();
    const courseElem = fixture.debugElement.queryAll(By.css('.courses-list .list .virtualized-list .virtualized-list-item .course'))[0];
    const delBtn = courseElem.queryAll(By.css('.buttons button'))[1];

    // act
    delBtn.triggerEventHandler('click', null);

    // assert
    expect(!!onDeleteCourseSpy.calls.count()).toBeTruthy();
    expect(component.items$.getValue().length).toBe(999);
    expect(document.contains(courseElem.nativeElement)).toBeFalsy();
  });
});
