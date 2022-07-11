import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSentPageComponent } from './email-sent-page.component';

describe('EmailSentPageComponent', () => {
  let component: EmailSentPageComponent;
  let fixture: ComponentFixture<EmailSentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
