import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginApiService } from '../providers/login-api.service';
import { CaseServiceService } from '../providers/case-service.service';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter, NgDatePickerAdapter } from './datepicker-adapter';
import { ShippingAddressComponent } from './controls/shipping-address/shipping-address.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { ArchwizardModule } from 'angular-archwizard';
import { CaseRecordsComponent } from './cases/case-records/case-records.component';
import { CaseRecordImageComponent } from './cases/case-record-image/case-record-image.component';
import { CaseReviewDetailsComponent } from './cases/case-review-details/case-review-details.component';
import { ToothItemComponent } from './controls/tooth-item/tooth-item.component';
import { TeethComponent } from './controls/teeth/teeth.component';
import { PackageModalComponent } from './controls/package-modal/package-modal.component';
import { UserModalComponent } from './controls/user-modal/user-modal.component';
import { SpacesTeethComponent } from './controls/spaces-teeth/spaces-teeth.component';
import { ToothItemOnlyComponent } from './controls/tooth-item-only/tooth-item-only.component';
import { CaseRevisionsListComponent } from './cases/case-revisions-list/case-revisions-list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileLoaderComponent } from './controls/file-loader/file-loader.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageLoaderComponent } from './controls/image-loader/image-loader.component';
import { NewRevisionComponent } from './revisions/new-revision/new-revision.component';
import { IprTeethComponent } from './revisions/ipr-teeth/ipr-teeth.component';
import { TeethMoveChartComponent } from './revisions/teeth-move-chart/teeth-move-chart.component';
import { CaseShippingComponent } from './cases/case-shipping/case-shipping.component';
import { NumbersOnly } from '../providers/NumbersOnly';
import { ViewRevisionComponent } from './revisions/view-revision/view-revision.component';
import { NgxMaskModule } from 'ngx-mask';
import { ActionsMenuComponent } from './cases/actions-menu/actions-menu.component';
import { ChatComponent } from './chat/chat.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CaseHistoryComponent } from './cases/case-history/case-history.component';

// import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde'

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { DoctorModalComponent } from './controls/doctor-modal/doctor-modal.component';
import { RevisionEditComponent } from './controls/revision-edit/revision-edit.component';
import { PostRevisionComponent } from './revisions/post-revision/post-revision.component';
import { CasePostComponent } from './cases/case-post/case-post.component';

@NgModule({
  declarations: [
    ShippingAddressComponent,
    CaseRecordsComponent,
    CaseRecordImageComponent,
    CaseReviewDetailsComponent,
    TeethComponent,
    ToothItemComponent,
    PackageModalComponent,
    UserModalComponent,
    SpacesTeethComponent,
    ToothItemOnlyComponent,
    CaseRevisionsListComponent,
    ImageLoaderComponent,
    FileLoaderComponent,
    NewRevisionComponent,
    IprTeethComponent,
    TeethMoveChartComponent,
    CaseShippingComponent,
    NumbersOnly,
    ViewRevisionComponent,
    ActionsMenuComponent,
    ChatComponent,
    DoctorModalComponent,
    RevisionEditComponent,
    PostRevisionComponent,
    CasePostComponent,
    CaseHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    HttpClientModule,
    ArchwizardModule,
    NgxDatatableModule,
    NgxDropzoneModule,
    NgxMaskModule.forRoot({ validation: true }),
    PerfectScrollbarModule,
    // SimplemdeModule.forRoot({
    //   provide: SIMPLEMDE_CONFIG,
    //   useValue: {}
    // })
  ],
  providers: [
    LoginApiService,
    CaseServiceService,
    { provide: NgbDateAdapter, useClass: NgDatePickerAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [
    ShippingAddressComponent,
    CaseRecordsComponent,
    CaseReviewDetailsComponent,
    TeethComponent,
    PackageModalComponent,
    UserModalComponent,
    SpacesTeethComponent,
    ToothItemOnlyComponent,
    CaseRevisionsListComponent,
    ImageLoaderComponent,
    FileLoaderComponent,
    NewRevisionComponent,
    CaseShippingComponent,
    NumbersOnly,
    ActionsMenuComponent,
    ChatComponent,
    DoctorModalComponent,
    PostRevisionComponent,
    CasePostComponent,
    CaseHistoryComponent
  ]
})
export class SharedLibModule { }
