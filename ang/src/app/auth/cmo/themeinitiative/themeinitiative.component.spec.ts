import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeinitiativeComponent } from './themeinitiative.component';

describe('ThemeinitiativeComponent', () => {
  let component: ThemeinitiativeComponent;
  let fixture: ComponentFixture<ThemeinitiativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeinitiativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeinitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
