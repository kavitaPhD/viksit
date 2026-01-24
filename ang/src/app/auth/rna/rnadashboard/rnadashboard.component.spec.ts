import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RnadashboardComponent } from './rnadashboard.component';

describe('RnadashboardComponent', () => {
  let component: RnadashboardComponent;
  let fixture: ComponentFixture<RnadashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RnadashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RnadashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
