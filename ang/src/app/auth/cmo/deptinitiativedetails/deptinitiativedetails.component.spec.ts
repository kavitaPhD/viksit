import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptinitiativedetailsComponent } from './deptinitiativedetails.component';

describe('DeptinitiativedetailsComponent', () => {
  let component: DeptinitiativedetailsComponent;
  let fixture: ComponentFixture<DeptinitiativedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptinitiativedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptinitiativedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
