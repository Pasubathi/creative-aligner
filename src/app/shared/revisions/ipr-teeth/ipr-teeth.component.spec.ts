import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IprTeethComponent } from './ipr-teeth.component';

describe('IprTeethComponent', () => {
  let component: IprTeethComponent;
  let fixture: ComponentFixture<IprTeethComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IprTeethComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IprTeethComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
