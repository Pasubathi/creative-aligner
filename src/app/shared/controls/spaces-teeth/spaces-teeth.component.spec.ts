import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacesTeethComponent } from './spaces-teeth.component';

describe('SpacesTeethComponent', () => {
  let component: SpacesTeethComponent;
  let fixture: ComponentFixture<SpacesTeethComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacesTeethComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpacesTeethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
