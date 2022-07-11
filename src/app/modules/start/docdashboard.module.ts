import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListCasesComponent } from './list-cases/list-cases.component';
import { ArchwizardModule } from 'angular-archwizard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocdashboardComponent } from './docdashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserPasswordComponent } from '../../shared/controls/user-password/user-password.component';
import { SharedLibModule } from '../../shared/shared-lib.module';

const routes: Routes = [
  {
    path: '',
    component: DocdashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'cases',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'cases',
        component: ListCasesComponent
      }
    ]
  },
]

@NgModule({
  declarations: [ListCasesComponent,
    DocdashboardComponent,
    UserProfileComponent,
    UserPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ArchwizardModule,
    NgbModule,
    NgSelectModule,
    SharedLibModule
  ],
  providers: [
  ]
})
export class DocdashboardModule { }
