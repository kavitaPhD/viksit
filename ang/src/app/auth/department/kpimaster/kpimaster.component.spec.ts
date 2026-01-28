import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpimasterComponent } from './kpimaster.component';

describe('KpimasterComponent', () => {
  let component: KpimasterComponent;
  let fixture: ComponentFixture<KpimasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KpimasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KpimasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
