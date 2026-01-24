import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemewiseprogressComponent } from './themewiseprogress.component';

describe('ThemewiseprogressComponent', () => {
  let component: ThemewiseprogressComponent;
  let fixture: ComponentFixture<ThemewiseprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemewiseprogressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemewiseprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
