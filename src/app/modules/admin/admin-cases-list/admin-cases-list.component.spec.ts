import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCasesListComponent } from './admin-cases-list.component';

describe('AdminCasesListComponent', () => {
  let component: AdminCasesListComponent;
  let fixture: ComponentFixture<AdminCasesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCasesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
