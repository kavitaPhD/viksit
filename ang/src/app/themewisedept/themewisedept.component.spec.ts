import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemewisedeptComponent } from './themewisedept.component';

describe('ThemewisedeptComponent', () => {
  let component: ThemewisedeptComponent;
  let fixture: ComponentFixture<ThemewisedeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemewisedeptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemewisedeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
