import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingChatComponent } from './pending-chat.component';

describe('PendingChatComponent', () => {
  let component: PendingChatComponent;
  let fixture: ComponentFixture<PendingChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
