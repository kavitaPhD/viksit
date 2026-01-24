import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeentryComponent } from './schemeentry.component';

describe('SchemeentryComponent', () => {
  let component: SchemeentryComponent;
  let fixture: ComponentFixture<SchemeentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
