import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepPerscriptionComponent } from './step-perscription.component';

describe('StepPerscriptionComponent', () => {
  let component: StepPerscriptionComponent;
  let fixture: ComponentFixture<StepPerscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepPerscriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepPerscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
