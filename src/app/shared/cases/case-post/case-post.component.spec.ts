import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasePostComponent } from './case-post.component';

describe('CasePostComponent', () => {
  let component: CasePostComponent;
  let fixture: ComponentFixture<CasePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
