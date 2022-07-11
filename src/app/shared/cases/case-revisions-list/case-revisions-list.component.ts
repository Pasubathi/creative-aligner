import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { AdminApiService } from 'src/app/providers/admin-api.service';
import { EnumCaseStages, ERevisions } from '../../../models/data';
import { CaseData, RevisionVO } from '../../../models/entities';
import { CaseServiceService } from '../../../providers/case-service.service';
import { LoginApiService } from '../../../providers/login-api.service';
import { RevisionEditComponent } from '../../controls/revision-edit/revision-edit.component';
import { ViewRevisionComponent } from '../../revisions/view-revision/view-revision.component';

@Component({
  selector: 'app-case-revisions-list',
  templateUrl: './case-revisions-list.component.html',
  styleUrls: ['./case-revisions-list.component.scss']
})
export class CaseRevisionsListComponent implements OnInit {

  public loadingIndicator: boolean = false;
  public isOrthodontistCollapsed: boolean = true;
  public savingCase: boolean = false;
  public isApprove: boolean = false;
  public isReturn: boolean = false;
  public isReviseRevisionCollapsed: boolean = true;


  ColumnMode = ColumnMode;

  @Input()
  public case: CaseData = new CaseData();

  @Input()
  public isOrthodontist: boolean = false;

  @Input()
  public isDoctor: boolean = false;

  @Input()
  public isAdmin: boolean = true;

  @ViewChild('revisionCtr')
  public revisionCtr: RevisionEditComponent;


  constructor(public api: CaseServiceService,
    public admin: AdminApiService,
    private nav: Router,
    public auth: LoginApiService,
    public activatedRoute: ActivatedRoute) {
    nav.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
  }

  viewItem(row: ERevisions) {
    //alert(row.RevisionNumber);
    //this.viewRevision.showDlg(row);
    if (this.isAdmin) {
      this.nav.navigate(['/admin/viewrevision', { id: row.ID, caseid: this.case.Data.ID }]);
    }
    else {
      this.nav.navigate(['/case/viewrevision', { id: row.ID, caseid: this.case.Data.ID }]);
    }
  }

  editItem(row: ERevisions) {
    this.revisionCtr.showDlg(row);
  }

  public canEdit(): boolean {
    if (!this.auth.isAdmin()) {
      return false;
    }

    let edit_revision = (this.case.Data.ImpressionType=='Digital' && this.case.Data.CaseStage=='Accepted')
      || (this.case.Data.ImpressionType=='Physical' && this.case.Data.CaseStage=='ImpressionsReceived')
      || (this.case.Data.CaseStage=='RequestNewRevision')
      || (this.case.Data.CaseStage=='AmendRevision')
      || (this.case.Data.CaseStage=='RequestRefinments')
      || (this.case.Data.CaseStage=='RequestMidcourseAdjusment');

    if (!edit_revision) {
      return false;
    }

    let result: boolean = true;
    this.case.Revisions.forEach((a: ERevisions) => {
      if (a.IsApproved) {
        result = false;
      }
    });
    return result;
  }

  onRevisionChanged(modal: any) {
    this.admin.getRevisions(this.api.case.Data).subscribe(e => {
      if (e.Success) {
        let items: RevisionVO[] = [];
        e.Items.forEach((a: any) => {
          let item: RevisionVO = new RevisionVO();
          item.loadData(a);
          items.push(item);
        });
        this.case.Revisions = items;
      }
      else {
        console.debug(e);
      }
      this.revisionCtr.closeDlg(modal);
    }, error => {
      console.debug(error);
      this.revisionCtr.closeDlg(modal);
      // this.isDeleting = false;
      // this.errorMessage = 'failed: ' + error.message;
    });  
  }
}
