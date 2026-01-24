import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativedetailsComponent } from './initiativedetails.component';

describe('InitiativedetailsComponent', () => {
  let component: InitiativedetailsComponent;
  let fixture: ComponentFixture<InitiativedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiativedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
