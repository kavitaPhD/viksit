import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryprogressComponent } from './entryprogress.component';

describe('EntryprogressComponent', () => {
  let component: EntryprogressComponent;
  let fixture: ComponentFixture<EntryprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryprogressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
