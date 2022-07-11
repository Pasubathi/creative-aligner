import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRevisionComponent } from './view-revision.component';

describe('ViewRevisionComponent', () => {
  let component: ViewRevisionComponent;
  let fixture: ComponentFixture<ViewRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRevisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
