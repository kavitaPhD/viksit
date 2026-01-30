import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminthemedashboardComponent } from './adminthemedashboard.component';

describe('AdminthemedashboardComponent', () => {
  let component: AdminthemedashboardComponent;
  let fixture: ComponentFixture<AdminthemedashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminthemedashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminthemedashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
