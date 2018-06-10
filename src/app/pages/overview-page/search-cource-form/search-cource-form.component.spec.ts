import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCourceFormComponent } from './search-cource-form.component';

describe('SearchCourceFormComponent', () => {
  let component: SearchCourceFormComponent;
  let fixture: ComponentFixture<SearchCourceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCourceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
