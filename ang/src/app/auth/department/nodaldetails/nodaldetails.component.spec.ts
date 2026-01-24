import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodaldetailsComponent } from './nodaldetails.component';

describe('NodaldetailsComponent', () => {
  let component: NodaldetailsComponent;
  let fixture: ComponentFixture<NodaldetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodaldetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodaldetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
