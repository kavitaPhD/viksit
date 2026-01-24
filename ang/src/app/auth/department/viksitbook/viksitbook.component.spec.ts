import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViksitbookComponent } from './viksitbook.component';

describe('ViksitbookComponent', () => {
  let component: ViksitbookComponent;
  let fixture: ComponentFixture<ViksitbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViksitbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViksitbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
