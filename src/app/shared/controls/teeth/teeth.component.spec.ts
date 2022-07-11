import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeethComponent } from './teeth.component';

describe('TeethComponent', () => {
  let component: TeethComponent;
  let fixture: ComponentFixture<TeethComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeethComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
