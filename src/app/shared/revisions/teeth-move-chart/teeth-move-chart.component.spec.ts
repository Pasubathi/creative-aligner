import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeethMoveChartComponent } from './teeth-move-chart.component';

describe('TeethMoveChartComponent', () => {
  let component: TeethMoveChartComponent;
  let fixture: ComponentFixture<TeethMoveChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeethMoveChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeethMoveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
