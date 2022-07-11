import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EUsers, EUserSessions } from '../../../models/data';
import { ResetPassword } from '../../../models/entities';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent implements OnInit {

  public returnUrl: any;
  public loginForm: FormGroup;

  public loading: boolean = false;
  public loginFailed: boolean = false;
  public errorMessage: string = '';
  public current: ResetPassword = new ResetPassword();

  constructor(public api: LoginApiService,
    private router: Router,
    private route: ActivatedRoute,
    private builder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      userPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.current.ID = this.route.snapshot.queryParams['id'] || 'error';
  }

  public resetClick() {
    this.current.Password = this.loginForm.value.userPassword;

    this.loading = true;
    this.loginFailed = false;

    this.api.doResetPassword(this.current).subscribe(a => {
      this.loading = false;
      if (a.Success) {
          this.router.navigate(['/auth/login']);
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
