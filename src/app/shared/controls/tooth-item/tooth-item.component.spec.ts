import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToothItemComponent } from './tooth-item.component';

describe('ToothItemComponent', () => {
  let component: ToothItemComponent;
  let fixture: ComponentFixture<ToothItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToothItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToothItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
