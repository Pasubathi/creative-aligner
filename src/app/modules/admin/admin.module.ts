import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedLibModule } from '../../shared/shared-lib.module';
import { AdminComponent } from './admin.component';
import { AdminCasesListComponent } from './admin-cases-list/admin-cases-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminCaseReviewComponent } from './admin-case-review/admin-case-review.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsersComponent } from './users/users.component';
import { PackagesComponent } from './packages/packages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TermsAgreementComponent } from './terms-agreement/terms-agreement.component';

import { QuillModule } from 'ngx-quill';
import { EmailSettingsComponent } from './email-settings/email-settings.component';
import { ViewRevisionComponent } from '../../shared/revisions/view-revision/view-revision.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { PendingChatComponent } from './pending-chat/pending-chat.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: AdminCasesListComponent
      },
      {
        path: 'terms',
        component: TermsAgreementComponent
      },
      {
        path: 'emails',
        component: EmailSettingsComponent
      },
      {
        path: 'admin-case-review',
        component: AdminCaseReviewComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'pending',
        component: PendingChatComponent
      },
      {
        path: 'doctors',
        component: DoctorsComponent
      },
      {
        path: 'packages',
        component: PackagesComponent
      },
      {
        path: 'viewrevision',
        component: ViewRevisionComponent
      }
    ]
  },
]

@NgModule({
  declarations: [AdminCasesListComponent, AdminComponent, AdminCaseReviewComponent,
    UsersComponent, PackagesComponent, TermsAgreementComponent, EmailSettingsComponent, DoctorsComponent,
    PendingChatComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    NgxDatatableModule,
    SharedLibModule,
    NgSelectModule,
    NgbNavModule,
    NgbModule,
    QuillModule,
    SharedLibModule
  ],
  providers: [
  ]
})
export class AdminModule { }
