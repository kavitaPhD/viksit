import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubinitiativeentryComponent } from './subinitiativeentry.component';

describe('SubinitiativeentryComponent', () => {
  let component: SubinitiativeentryComponent;
  let fixture: ComponentFixture<SubinitiativeentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubinitiativeentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubinitiativeentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
