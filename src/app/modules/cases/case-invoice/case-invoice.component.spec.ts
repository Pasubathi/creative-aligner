import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseInvoiceComponent } from './case-invoice.component';

describe('CaseInvoiceComponent', () => {
  let component: CaseInvoiceComponent;
  let fixture: ComponentFixture<CaseInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
