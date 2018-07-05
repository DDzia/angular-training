import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBreadcrumbComponent } from './page-breadcrumb.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { IBreadcrumb } from './ibreadcrumb';

@Component({
  selector: 'app-test-host',
  template: `
    <app-page-breadcrumb [item]="stupidBreadcrumb"></app-page-breadcrumb>
  `
})
class TestHostComponent {
  stupidBreadcrumb: IBreadcrumb = {
    title: 'some title',
    url: 'http://github.com/'
  };
}

describe('PageBreadcrumbComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule
      ],
      declarations: [
        TestHostComponent,
        PageBreadcrumbComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('link url and test has been inserted', () => {
    // arrange
    const linkNode = fixture.debugElement.query(By.css('.breadcrumb a')).nativeElement as HTMLLinkElement;

    // assert
    expect(linkNode.innerText).toBe(component.stupidBreadcrumb.title);
    expect(linkNode.href).toBe(component.stupidBreadcrumb.url);
  });
});
