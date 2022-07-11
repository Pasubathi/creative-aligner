import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseRecordImageComponent } from './case-record-image.component';

describe('CaseRecordImageComponent', () => {
  let component: CaseRecordImageComponent;
  let fixture: ComponentFixture<CaseRecordImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseRecordImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseRecordImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
