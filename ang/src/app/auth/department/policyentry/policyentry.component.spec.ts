import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyentryComponent } from './policyentry.component';

describe('PolicyentryComponent', () => {
  let component: PolicyentryComponent;
  let fixture: ComponentFixture<PolicyentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
