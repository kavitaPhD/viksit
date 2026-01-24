import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmodashboardComponent } from './cmodashboard.component';

describe('CmodashboardComponent', () => {
  let component: CmodashboardComponent;
  let fixture: ComponentFixture<CmodashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmodashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmodashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
