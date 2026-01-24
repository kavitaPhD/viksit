import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativemasterComponent } from './initiativemaster.component';

describe('InitiativemasterComponent', () => {
  let component: InitiativemasterComponent;
  let fixture: ComponentFixture<InitiativemasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiativemasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitiativemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
