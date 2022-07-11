import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ECountrys, EUsers } from '../../../models/data';
import { RegisterUser } from '../../../models/entities';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public user: RegisterUser = new RegisterUser();
  public isLoading: boolean = false;
  public message: string = '';
  public isSubmitted: boolean = false;
  public specialities: any[] = [{ value: 'Orthodontist', name: 'Orthodontist' }, { value: 'General Dental Practitioner', name: 'General Dental Practitioner' }, { value: 'Other', name: 'Other' }];
  public countries: ECountrys[] = [];
  public alreadyRegistered: boolean = false;

  emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  @ViewChild('registerForm')
  registerForm: FormGroup;

  constructor(public api: LoginApiService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.user.CountryID = '';
    this.api.getCountries().subscribe(a => {
      let items: ECountrys[] = [];
      if (a.Success) {
        a.Countries.forEach((data: any) => {
          let i = new ECountrys();
          i.load(data);
          items.push(i);
        });
      }
      this.countries = items;
    }, error => {
      console.debug(error);
    })
  }

  public isValidform(): boolean {
    return this.user
      && this.user.Password.length > 5
      && this.user.Password == this.user.ConfirmPassword;
  }

  public registerClick() {
    this.isSubmitted = true;
    this.alreadyRegistered = false;
    if (!this.isValidform() || !this.registerForm.valid) {
      return;
    }
    this.isLoading = true;
    this.message = "";
    this.api.doRegister(this.user.toUser()).subscribe(a => {
      this.isLoading = false;
      if (a.Success) {
        this.router.navigate(['/auth/welcome'], { queryParams: { returnUrl: '/' } });
      }
      else {
        this.message = 'Registeration failed: ' + a.Message;
        if (a.Op && a.Op == 1) {
          this.alreadyRegistered = true;
        }
        console.debug(a);
      }
    }, error => {
      this.isLoading = false;
      this.message = 'Registeration failed: ' + error.message;
      console.debug(error);
    });
  }

}
