import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthComponent } from './userauth.component';
import { LoginApiService } from '../../providers/login-api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedLibModule } from '../../shared/shared-lib.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { EmailSentPageComponent } from './email-sent-page/email-sent-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserAuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegisterPageComponent
      },
      {
        path: 'welcome',
        component: WelcomePageComponent
      },
      {
        path: 'forgot',
        component: ForgotPasswordPageComponent
      },
      {
        path: 'reset',
        component: ResetPasswordPageComponent
      },
      {
        path: 'emailsent',
        component: EmailSentPageComponent
      }
    ]
  },
]

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent, UserAuthComponent, ResetPasswordPageComponent, ForgotPasswordPageComponent, WelcomePageComponent, EmailSentPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgSelectModule,
    SharedLibModule
  ],
  providers: [
  ]
})
export class UserAuthModule { }
