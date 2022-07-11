import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseShippingComponent } from './case-shipping.component';

describe('CaseShippingComponent', () => {
  let component: CaseShippingComponent;
  let fixture: ComponentFixture<CaseShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseShippingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
