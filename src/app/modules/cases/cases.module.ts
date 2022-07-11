import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CasesComponent } from './cases.component';
import { NewCaseComponent } from './new-case/new-case.component';
import { ArchwizardModule } from 'angular-archwizard';
// Ng-select
import { NgSelectModule } from '@ng-select/ng-select';
// Ngx-dropzone-wrapper

import { StepPerscriptionComponent } from './step-perscription/step-perscription.component';
import { StepImagesComponent } from './step-images/step-images.component';
import { StepSummaryComponent } from './step-summary/step-summary.component';
import { CaseReviewComponent } from './case-review/case-review.component';
import { SharedLibModule } from '../../shared/shared-lib.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CaseInvoiceComponent } from './case-invoice/case-invoice.component';
import { ViewRevisionComponent } from '../../shared/revisions/view-revision/view-revision.component';

const routes: Routes = [
  {
    path: '',
    component: CasesComponent,
    children: [
      {
        path: '',
        redirectTo: 'newcase',
        pathMatch: 'full'
      },
      {
        path: 'newcase',
        component: NewCaseComponent
      }
      ,
      {
        path: 'case-review',
        component: CaseReviewComponent
      }
      ,
      {
        path: 'case-invoice',
        component: CaseInvoiceComponent
      },
      {
        path: 'viewrevision',
        component: ViewRevisionComponent
      }
    ]
  },
]

@NgModule({
  declarations: [
    CasesComponent,
    NewCaseComponent,
    StepPerscriptionComponent,
    StepImagesComponent,
    StepSummaryComponent,
    CaseReviewComponent,
    CaseInvoiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ArchwizardModule,
    NgbModule,
    NgSelectModule,
    SharedLibModule,
  ],
  providers: [
  ]
})
export class CasesModule { }
