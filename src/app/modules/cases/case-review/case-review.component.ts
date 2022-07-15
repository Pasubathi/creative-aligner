import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ECaseHistory, ECases, ECaseTeeth, EnumCaseStages, ERevisions } from 'src/app/models/data';
import { BindingList } from 'src/app/models/entities';
import { CaseServiceService } from 'src/app/providers/case-service.service';
import { CasePostComponent } from 'src/app/shared/cases/case-post/case-post.component';
import { PostRevisionComponent } from 'src/app/shared/revisions/post-revision/post-revision.component';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-case-review',
  templateUrl: './case-review.component.html',
  styleUrls: ['./case-review.component.scss']
})
export class CaseReviewComponent implements OnInit {

  public isLoading: boolean = true;

  public isImpressionCollapsed = true;
  public savingCase: boolean = false;
  public isImpression: boolean = false;
  public isReviseRevisionCollapsed = true;
  public isApprove: boolean = false;
  public isRevise: boolean = false;
  public imgUrl: string = '';

  public action: EnumCaseStages = '';

  @ViewChild('postcase')
  postcase: CasePostComponent;

  constructor(public api: CaseServiceService,
    public auth: LoginApiService,
    public activatedRoute: ActivatedRoute ,
    private nav: Router) { 
      nav.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {
    
    let id: string = '';
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        id = params['id'];
      }
    });
    if (id.length > 0) {
      console.debug('loading ' + id);
      this.api.getCase(id).subscribe(a => {
        if (a.Success) {
          this.api.readCase(a, this.auth.user.NotationSystem);
          console.debug(this.api.case);
          this.isLoading = false;
          if(this.api.case.Data.ImageFrontSmiling)
          {
            this.imgUrl = this.api.getUrl('DataApi', 'GetFile') + '?file=' + this.api.case.Data.ImageFrontSmiling;
          }
        }
        else {
          alert('No data: ' + a.Message);
        }
      }, error => {
        alert('loading failed');
      });
    }
  }

  updateCaseStatus(identifier: string, caseStage: EnumCaseStages) {
    this.savingCase = true;
    if (identifier == 'isApprove') { this.isApprove = true; }
    else if (identifier == 'isImpression') { this.isImpression = true; }
    else if (identifier == 'isRevise') { this.isRevise = true; }
    console.debug(this.api.case.Data);
    this.api.case.Data.CaseStage = caseStage;
    this.api.case.Data.ReturnNotes = '';
    this.api.saveCase().subscribe(a => {
      this.savingCase = false;
      if (identifier == 'isApprove') { this.isApprove = false; }
      else if (identifier == 'isImpression') { this.isImpression = false; }
      else if (identifier == 'isReturn') { this.isRevise = false; }
      if (a.Success) {
        this.api.case.Data.load(a.Case);
        this.nav.navigate(['dashboard/cases']);
        window.scrollTo(0, 0);
      }
      else {
        console.debug(a.Message);
        alert(a.Message);
      }
    }, error => {
      this.savingCase = false;
      if (identifier == 'isApprove') { this.isApprove = false; }
      else if (identifier == 'isImpression') { this.isImpression = false; }
      else if (identifier == 'isReturn') { this.isRevise = false; }
      console.debug(error);
      alert('Failed: ' + error.Message);
    });
  }

  impressions_Shipped(){
    this.updateCaseStatus('isImpression','ImpressionsShipped');
  }
  approveRevision(){
    this.updateCaseStatus('isApprove','Approved');
  }

  doRequestRefinments() {
    let data: BindingList[] = [];
    data.push(this.getBinding('RequestRefinments', 'Request Refinments'));
    this.postcase.showDlg('RequestRefinments', data, true);
  }

  doRequestMidcourseAdjusment() {
    let data: BindingList[] = [];
    data.push(this.getBinding('RequestMidcourseAdjusment', 'Request Midcourse Adjusment'));
    this.postcase.showDlg('RequestMidcourseAdjusment', data, true);
  }

  doReplaceMissing() {
    let data: BindingList[] = [];
    data.push(this.getBinding('ReplaceMissing', 'Request Replace Missing'));
    this.postcase.showDlg('ReplaceMissing', data, false);
  }

  doRequestNextShipment() {
    let data: BindingList[] = [];
    data.push(this.getBinding('RequestNextShipment', 'Request Replace Missing'));
    this.postcase.showDlg('RequestNextShipment', data, false);
  }

  doRequestRetainer() {
    let data: BindingList[] = [];
    data.push(this.getBinding('Manufacturing', 'Use last design'));
    data.push(this.getBinding('RequestRetainer_Physical', 'Pickup physical impressions'));
    data.push(this.getBinding('RequestRetainer_Digital', 'Upload digital impressions'));
    this.postcase.showDlg('RequestRetainer', data, true);
  }

  doArchived() {
    let data: BindingList[] = [];
    data.push(this.getBinding('Archived', 'Archive Case'));
    this.postcase.showDlg('Archived', data, false);
  }

  getBinding(value: string, name: string) : BindingList{
    let item: BindingList = new BindingList();
    item.name = name;
    item.value = value;
    return item;
  }

}
