import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiprogressentryComponent } from './kpiprogressentry.component';

describe('KpiprogressentryComponent', () => {
  let component: KpiprogressentryComponent;
  let fixture: ComponentFixture<KpiprogressentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiprogressentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiprogressentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
