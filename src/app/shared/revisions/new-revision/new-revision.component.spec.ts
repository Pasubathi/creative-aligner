import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRevisionComponent } from './new-revision.component';

describe('NewRevisionComponent', () => {
  let component: NewRevisionComponent;
  let fixture: ComponentFixture<NewRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
