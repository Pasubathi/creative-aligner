import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseRevisionsListComponent } from './case-revisions-list.component';

describe('CaseRevisionsListComponent', () => {
  let component: CaseRevisionsListComponent;
  let fixture: ComponentFixture<CaseRevisionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseRevisionsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseRevisionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
