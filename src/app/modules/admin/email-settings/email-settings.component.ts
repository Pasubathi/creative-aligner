import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmailSettings, PostPageContent, RequestPageContent } from '../../../models/entities';
import { AdminApiService } from '../../../providers/admin-api.service';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-email-settings',
  templateUrl: './email-settings.component.html',
  styleUrls: ['./email-settings.component.scss']
})
export class EmailSettingsComponent implements OnInit {

  public Settings: EmailSettings = new EmailSettings();

  public loading: boolean = true;
  public savedSuccess: number = 0;
  public isSaving: boolean = false;
  public emailTesting: boolean = false;
  public TestMessage: string = '';

  public formSubmited: boolean = false;

  @ViewChild('mailForm')
  mailForm: FormGroup;

  constructor(public api: AdminApiService,
    public auth: LoginApiService) { }

  ngOnInit(): void {
    let page = new RequestPageContent();
    page.ContentKey = "EmailSettings";
    this.api.GetPageContent(page).subscribe(data => {
      console.debug(data);
      this.loading = false;

      let item = new EmailSettings();
      if (data.ContentData) {
        let temp = JSON.parse(data.ContentData);
        if (temp && temp.Email) {
          item.Email = temp.Email;
        }
        if (temp && temp.Password) {
          item.Password = temp.Password;
        }
        if (temp && temp.Port) {
          item.Port = temp.Port;
        }
        if (temp && temp.Smtp) {
          item.Smtp = temp.Smtp;
        }
        if (temp && temp.UseSsl) {
          item.UseSsl = temp.UseSsl;
        }
      }
      this.Settings = item;
    }, error => {
      this.loading = false;
      console.debug(error);
    });
  }

  public saveContent() {
    this.formSubmited = true;
    if (!this.mailForm.valid) {
      return;
    }
    this.savedSuccess = 0;
    this.isSaving = true;
    let entity = new PostPageContent();
    entity.ContentKey = "EmailSettings";
    entity.ContentData = JSON.stringify(this.Settings);
    console.debug(entity);
    this.api.SetPageContent(entity).subscribe(data => {
      console.debug(data);
      this.isSaving = false;
      if (data.Success) {
        this.savedSuccess = 1;
      }
      else {
        this.savedSuccess = 2;
      }
    }, error => {
      this.isSaving = false;
      console.debug(error);
    });
  }

  public doTestEmail() {
    this.savedSuccess = 0;
    this.emailTesting = true;
    this.api.testEmail(this.auth.user).subscribe(data => {
      console.debug(data);
      this.emailTesting = false;
      this.TestMessage = data.Message;
      this.savedSuccess = 3;
    }, error => {
      this.emailTesting = false;
      console.debug(error);
      this.TestMessage = "Failed to send command to server";
      this.savedSuccess = 3;
    });
  }

}
