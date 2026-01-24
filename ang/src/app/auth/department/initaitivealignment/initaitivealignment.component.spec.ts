import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitaitivealignmentComponent } from './initaitivealignment.component';

describe('InitaitivealignmentComponent', () => {
  let component: InitaitivealignmentComponent;
  let fixture: ComponentFixture<InitaitivealignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitaitivealignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitaitivealignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
