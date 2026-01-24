import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddkpiComponent } from './addkpi.component';

describe('AddkpiComponent', () => {
  let component: AddkpiComponent;
  let fixture: ComponentFixture<AddkpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddkpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddkpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
