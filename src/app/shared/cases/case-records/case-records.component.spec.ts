import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseRecordsComponent } from './case-records.component';

describe('CaseRecordsComponent', () => {
  let component: CaseRecordsComponent;
  let fixture: ComponentFixture<CaseRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
