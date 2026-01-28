import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiprogressdashboardComponent } from './kpiprogressdashboard.component';

describe('KpiprogressdashboardComponent', () => {
  let component: KpiprogressdashboardComponent;
  let fixture: ComponentFixture<KpiprogressdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiprogressdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiprogressdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
