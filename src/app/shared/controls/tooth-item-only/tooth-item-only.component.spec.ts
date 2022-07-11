import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToothItemOnlyComponent } from './tooth-item-only.component';

describe('ToothItemOnlyComponent', () => {
  let component: ToothItemOnlyComponent;
  let fixture: ComponentFixture<ToothItemOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToothItemOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToothItemOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
