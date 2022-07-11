import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {

  public loginForm: FormGroup;
  public loading: boolean = false;
  public loginFailed: boolean = false;
  public errorMessage: string = '';

  constructor(public api: LoginApiService,
    private router: Router,
    private route: ActivatedRoute,
    private builder: FormBuilder) 
  {
    this.loginForm = this.builder.group({
      userName: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
  }


  resetClick() {
    this.loading = true;
    this.loginFailed = false;

    this.api.sendResetEmail(this.loginForm.value.userName).subscribe(a => {
      this.loading = false;
      if (a.Success) {
        this.router.navigate(['/auth/emailsent']);
      }
      else {
        this.loginFailed = true;
        this.errorMessage = a.Message;
      }
    }, error => {
      this.loading = false;
      this.loginFailed = true;
      this.errorMessage = 'Connection to the server is not available';
      console.debug(error);
    });
  }
}
