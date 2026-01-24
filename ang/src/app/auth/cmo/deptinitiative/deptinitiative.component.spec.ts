import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptinitiativeComponent } from './deptinitiative.component';

describe('DeptinitiativeComponent', () => {
  let component: DeptinitiativeComponent;
  let fixture: ComponentFixture<DeptinitiativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptinitiativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptinitiativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
