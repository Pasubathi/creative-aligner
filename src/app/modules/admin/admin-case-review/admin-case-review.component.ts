import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ECaseShipment, EnumCaseStages, EnumShipmnetType } from 'src/app/models/data';
import { CaseServiceService } from 'src/app/providers/case-service.service';
import { LoginApiService } from 'src/app/providers/login-api.service';
import { CaseRevisionsListComponent } from '../../../shared/cases/case-revisions-list/case-revisions-list.component';

@Component({
  selector: 'app-admin-case-review',
  templateUrl: './admin-case-review.component.html',
  styleUrls: ['./admin-case-review.component.scss']
})
export class AdminCaseReviewComponent implements OnInit {

  public isLoading: number = 0;
  public savingCase: boolean = false;
  public isApprove: boolean = false;
  public isReturn: boolean = false;
  public errorMessage: string = "";

  public isImpressionShippingCollapsed: boolean = true;
  public isReturnCollapsed: boolean = true;
  public isImpressionCollapsed: boolean = true;
  public isReadyForShippingCollapsed: boolean = true;
  public isTreatmentShippedCollapsed: boolean = true;
  public isOrthodontistCollapsed: boolean = true;
  public isUpdatePriceCollapsed: boolean = true;
  public isManufacturingCollapsed: boolean = true;

  public alert1closed: boolean = false;
  public newShipment: ECaseShipment = new ECaseShipment();

  public isUploading: boolean = false;
  public isLoaded: boolean = false;
  public fileName: string = '';

  @ViewChild('selectfile') el: ElementRef;   //in html we make variable of selectfile
  progress = { loaded: 0, total: 0 };
  

  constructor(public api: CaseServiceService,
    public auth: LoginApiService,
    public activatedRoute: ActivatedRoute,
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
          this.isLoading = 1;
        }
        else {
          this.isLoading = 2;
          // alert('No data: ' + a.Message);
          this.errorMessage = 'No data: ' + a.Message;
        }
      }, error => {
        this.isLoading = 2;
        // alert('loading failed');
        this.errorMessage = 'Could not reach the server';
      });
    }
  }

  updateCaseStatus(identifier: string, caseStage: EnumCaseStages) {
    this.savingCase = true;
    if (identifier == 'isApprove') { this.isApprove = true; }
    else if (identifier == 'isReturn') { this.isReturn = true; }
    //isOrthodontistApprove
    console.debug(this.api.case.Data);
    
    this.api.casePost(this.api.case.Data.ID, caseStage).subscribe(a => {
      this.savingCase = false;
      //identifier = false;
      
      if (a.Success) {
        this.api.case.Data.CaseStage = caseStage;
        // this.api.case.Data.load(a.Case);
        if (identifier == 'isApprove') { this.isApprove = false; }
        else if (identifier == 'isReturn') { this.isReturn = false; }
        
        this.nav.navigate(['admin/home']);
        // window.scrollTo(0, 0);
      }
      else {
        console.debug(a.Message);
        alert(a.Message);
      }
    }, error => {
      this.savingCase = false;
      //identifier = false;
      if (identifier == 'isApprove') { this.isApprove = false; }
      else if (identifier == 'isReturn') { this.isReturn = false; }
      console.debug(error);
      alert('Failed: ' + error.Message);
    });
  }

  approve_case() {
    this.updateCaseStatus('isApprove', 'Accepted');
  }

  return_case() {
    this.updateCaseStatus('isReturn', 'Returned');
  }

  collect_impressions() {
    this.updateCaseStatus('noValue', 'ReadyForImpressionsCollection');
  }
  impressions_received() {
    this.updateCaseStatus('noValue', 'ImpressionsReceived');
  }
  readyForShipping() {
    this.updateCaseStatus('noValue', 'ReadyForShipping');
  }
  shippingCollapsable() {
    this.api.case.Data.TreatmentShippingPolicy='';
    this.isTreatmentShippedCollapsed = !this.isTreatmentShippedCollapsed;
  }
  // treatmentShipped() {
  //   this.updateCaseStatus('noValue', 'Active');
  // }
  public addCaseShipment(shipmentType: EnumShipmnetType) {
    // if (this.NewMessage.Message.length == 0) {
    //   return;
    // }
    this.savingCase = true;
    this.newShipment.CaseID = this.api.case.Data.ID;
    this.newShipment.ShipmnetType = shipmentType;//'Treatment';
    console.debug("Saving Treatment newShipment: "+ this.newShipment);

    this.api.addCaseShipment(this.newShipment).subscribe(e => {
      if (e.Success) {
        this.savingCase = false;
        //this.auth.readAddress(e.Entities);
        //this.isLoaded = false;
        // this.isLoading = false;
        //this.fileName = '';
        //this.NewMessage.Message = '';
        //this.NewMessage.Attachment = '';
        //this.getCaseMessages();
        this.nav.navigate(['admin/home']);
        // window.scrollTo(0, 0);
      }
      else {
        this.savingCase = false;
        console.error(e.Message);
        alert(e.Message);
      }
    }, error => {
      this.savingCase = false;
      console.debug(error);
      alert('failed: ' + error.message);
    });
  }

  updatePrice() {
    this.savingCase = true;
    console.debug(this.api.case.Data);
    this.api.saveCase().subscribe(a => {
      this.savingCase = false;
      if (a.Success) {
        this.api.case.Data.load(a.Case);
        this.nav.navigate(['admin/home']);
        window.scrollTo(0, 0);
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

  uploadShipmentPolicy() {
    if (this.el.nativeElement.files.length == 0) {
      return;
    }

    this.isLoaded = false;
    this.isUploading = true;
    var file = this.el.nativeElement.files[0];
    this.fileName = file.name;

    const formData = new FormData();
    formData.append("caseID", this.api.case.Data.ID);
    formData.append("userID", this.auth.user.ID);
    formData.append("imageid", "ShipmentPolicy");//file.name);
    formData.append('file', file, file.name);

    this.auth.uploadWithId(formData)
      .subscribe(
        (data: any) => {
          console.debug(data);
          if (data.type == 1 && data.loaded && data.total) {
            console.debug("gaju");
            this.progress.loaded = data.loaded;
            this.progress.total = data.total;
          }
          else if (data.body) {
            this.isUploading = false;
            this.isLoaded = true;
            this.newShipment.ShipmentPolicy = data.body.FilePath;
            console.debug("Data Uploaded");
            console.debug(data.body);
          }

        },
        error => {
          this.isUploading = false;
          console.debug(error);
        }
      );
  }

  public caseInvoice(){
    this.nav.navigate(['/case/case-invoice', { id: this.api.case.Data.ID }]);
  }
}
