import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EUsers, EUserSessions } from '../../../models/data';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  //public userCtr: FormControl;
  //public passwordCtr: FormControl;
  public returnUrl: any;
  public loginForm: FormGroup;

  public loading: boolean = false;
  public loginFailed: boolean = false;
  public errorMessage: string = '';
  public invalidPassword: boolean = false;

  constructor(public api: LoginApiService,
    private router: Router,
    private route: ActivatedRoute,
    private builder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      userName: ['', [Validators.required, Validators.email]],
      userPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  public loginClick() {
    let user = new EUsers();
    user.Email = this.loginForm.value.userName;
    user.Password = this.loginForm.value.userPassword;

    this.loading = true;
    this.loginFailed = false;

    this.api.doLogin(user).subscribe(a => {
      this.loading = false;
      this.invalidPassword = false;
      if (a.Success) {
        this.api.parseUserInfo(a);
        //console.debug(this.api.user);
        //console.debug(this.api.addresses);
        localStorage.setItem('isLoggedin', 'true');
        if (this.api.isMemeber()) {
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/dashboard']);
        }
      }
      else {
        this.loginFailed = true;
        this.errorMessage = a.Message;
        if (a.Op && a.Op == 1) {
          this.invalidPassword = true;
        }
      }
    }, error => {
      this.loading = false;
      this.loginFailed = true;
      this.errorMessage = 'Connection to the server is not available';
      console.debug(error);
    });
  }
}
