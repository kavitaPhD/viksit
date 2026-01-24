import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewinitaitiveComponent } from './newinitaitive.component';

describe('NewinitaitiveComponent', () => {
  let component: NewinitaitiveComponent;
  let fixture: ComponentFixture<NewinitaitiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewinitaitiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewinitaitiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
