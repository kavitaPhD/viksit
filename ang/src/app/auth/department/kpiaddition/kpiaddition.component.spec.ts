import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiadditionComponent } from './kpiaddition.component';

describe('KpiadditionComponent', () => {
  let component: KpiadditionComponent;
  let fixture: ComponentFixture<KpiadditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpiadditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiadditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
