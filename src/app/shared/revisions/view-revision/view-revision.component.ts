import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginApiService } from '../../../providers/login-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnumCaseStages, EPrices, ERevisions, ERevisionTeeth } from '../../../models/data';
import { CaseServiceService } from '../../../providers/case-service.service';
import { PostRevision, RevisionData } from '../../../models/entities';
import { ActivatedRoute, Router } from '@angular/router';
import { PostRevisionComponent } from '../post-revision/post-revision.component';

@Component({
  selector: 'app-view-revision',
  templateUrl: './view-revision.component.html',
  styleUrls: ['./view-revision.component.scss']
})
export class ViewRevisionComponent implements OnInit {

  public Data: RevisionData = new RevisionData();
  public CasePrice: EPrices = new EPrices();
  public errorMessage: string = '';
  public caseID: string = '';
  public sanDesignEmbededURL: any;

  public savingCase: boolean = false;
  public isReturn: boolean = false;
  public isReviseRevisionCollapsed: boolean = true;
  public isOrthodontistCollapsed: boolean = true;

  public showUpper() : boolean {
    if (this.showTeeth(this.Data.UAngulation)) {
      return true;
    }
    if (this.showTeeth(this.Data.UAngulationStep)) {
      return true;
    }
    if (this.showTeeth(this.Data.UInclination)) {
      return true;
    }
    if (this.showTeeth(this.Data.UInclinationStep)) {
      return true;
    }    
    if (this.showTeeth(this.Data.UMesialStep)) {
      return true;
    }
    if (this.showTeeth(this.Data.UOcclusalStep)) {
      return true;
    }
    if (this.showTeeth(this.Data.URotationStep)) {
      return true;
    }
    if (this.showTeeth(this.Data.UStripDistal)) {
      return true;
    }
    if (this.showTeeth(this.Data.UStripMesial)) {
      return true;
    }
    if (this.showTeeth(this.Data.UVestibularStep)) {
      return true;
    }
    return false;
  }

  public showLower() : boolean {
    if (this.showTeeth(this.Data.LAngulation)) {
      return true;
    }
    if (this.showTeeth(this.Data.LAngulationStep)) {
      return true;
    }
    if (this.showTeeth(this.Data.LInclination)) {
      return true;
    }
    if (this.showTeeth(this.Data.LInclinationStep)) {
      return true;
    }    
    if (this.showTeeth(this.Data.LMesialStep)) {
      return true;
    }
    if (this.showTeeth(this.Data.LOcclusalStep)) {
      return true;
    }
    if (this.showTeeth(this.Data.LRotationStep)) {
      return true;
    }
    if (this.showTeeth(this.Data.LStripDistal)) {
      return true;
    }
    if (this.showTeeth(this.Data.LStripMesial)) {
      return true;
    }
    if (this.showTeeth(this.Data.LVestibularStep)) {
      return true;
    }
    return false;
  }

  public showTeeth(val: ERevisionTeeth[]): boolean {
    if (!val || val.length == 0) {
      return false;
    }
    let hasValue = false;
    val.forEach(a => {
      if (a.RowValue && a.RowValue > 0) {
        hasValue = true;
      }
    });
    return hasValue;
  }

  public showIPR() : boolean{
    let result: boolean = false;
    this.Data.UpperIprAmount.forEach((a:ERevisionTeeth) => {
      if (a.RowValue > 0){
        result = true;
      }
    })
    if (result)
      {return true;}
    this.Data.UpperIprStep.forEach((a:ERevisionTeeth) => {
      if (a.RowValue > 0){
        result = true;
      }
    })
    if (result)
      {return true;}
    this.Data.LowerIprAmount.forEach((a:ERevisionTeeth) => {
      if (a.RowValue > 0){
        result = true;
      }
    })
    if (result)
      {return true;}
    this.Data.LowerIprStep.forEach((a:ERevisionTeeth) => {
      if (a.RowValue > 0){
        result = true;
      }
    })
  
    return result;
  }

  @ViewChild('postrevision')
  postrevision: PostRevisionComponent;


  public isLoading: number = 0;

  constructor(public auth: LoginApiService,
    public api: CaseServiceService,
    private nav: Router,
    private modalService: NgbModal,
    public san: DomSanitizer,
    public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let id: string = '';
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        id = params['id'];
      }
      if (params['caseid']) {
       this.caseID = params['caseid'];
      }
    });
    //console.debug({id,this.caseID});
    this.isLoading = 0;
    this.api.getRevision(this.caseID, id, this.auth.user.NotationSystem).subscribe(data => {
      if (data.Success) {
        var revision = new RevisionData();
        revision.parse(data.Result);
        this.Data = revision;
        this.CasePrice = this.getPackage();
        this.sanDesignEmbededURL = this.san.bypassSecurityTrustResourceUrl(revision.Revision.DesignEmbededURL);
        this.isLoading = 1;
      }
      else {
        this.isLoading = 2;
        this.errorMessage = data.Message;
      }
    }, error => {
      this.isLoading = 2;
      this.errorMessage = 'failed to start new revision, due to failure on server side';
      console.debug(error);
    });
  }

  getPackage(): EPrices {
    let item = new EPrices();
    let packageID = this.Data.Revision.PackageID;
    this.Data.Packages.forEach(function (a: EPrices) {
      if (a.ID == packageID) {
        item = a;
      }
    });
    return item;
  }

  updateCaseStatus(identifier: string, caseStage: EnumCaseStages) {
    this.savingCase = true;
    if (identifier == 'isReturn') { this.isReturn = true; }
    this.api.casePost(this.api.case.Data.ID, caseStage).subscribe(a => {
      this.savingCase = false;
      
      if (a.Success) {
        this.api.case.Data.CaseStage = caseStage;
        this.nav.navigate(['admin/home']);
      }
      else {
        console.debug(a.Message);
        alert(a.Message);
      }
    }, error => {
      this.savingCase = false;
      if (identifier == 'isReturn') { this.isReturn = false; }
      console.debug(error);
      alert('Failed: ' + error.Message);
    });
  }

  approveRevision() {
    let post = new PostRevision();
    post.Status = 'Approved';
    post.Revision = this.Data.Revision;
    this.savingCase = true;
    this.api.reviseRevision(post).subscribe(a => {
      this.savingCase = false;
      if (a.Success) {
        this.nav.navigate(['dashboard/cases']);
      }
      else {
        console.debug(a.Message);
        alert(a.Message);
      }
    }, error => {
      this.savingCase = false;
      console.debug(error);
      alert('Failed: ' + error.Message);
    });
  }

  reviseRevision() {
    this.postrevision.showDlg('RequestNewRevision', this.Data.Revision);
  }



  orthodontistRevise() {
    this.savingCase = true;
    this.isReturn = true;
    console.debug(this.api.case.Data);
    this.api.reviseDesign(this.Data.Revision).subscribe(a => {
      this.savingCase = false;
      this.isReturn = true;
      if (a.Success) {
        this.nav.navigate(['admin/home']);
      }
      else {
        console.debug(a.Message);
        alert(a.Message);
      }
    }, error => {
      this.savingCase = false;
      this.isReturn = true;
      console.debug(error);
      alert('Failed: ' + error.Message);
    });
  }
}
