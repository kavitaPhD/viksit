import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusentryComponent } from './statusentry.component';

describe('StatusentryComponent', () => {
  let component: StatusentryComponent;
  let fixture: ComponentFixture<StatusentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
