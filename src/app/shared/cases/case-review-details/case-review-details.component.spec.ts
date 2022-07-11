import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseReviewDetailsComponent } from './case-review-details.component';

describe('CaseReviewDetailsComponent', () => {
  let component: CaseReviewDetailsComponent;
  let fixture: ComponentFixture<CaseReviewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseReviewDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseReviewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
