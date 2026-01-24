import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemedetailsComponent } from './themedetails.component';

describe('ThemedetailsComponent', () => {
  let component: ThemedetailsComponent;
  let fixture: ComponentFixture<ThemedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
