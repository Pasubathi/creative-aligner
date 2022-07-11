import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';

import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { CaseServiceService } from 'src/app/providers/case-service.service';
import { ECases, ECaseTeeth, EPageContents, EShippingAddresses } from '../../../models/data';
import { AddressData, CaseData } from '../../../models/entities';
import { LoginApiService } from '../../../providers/login-api.service';
import { ShippingAddressComponent } from '../../../shared/controls/shipping-address/shipping-address.component';

@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: [
    './new-case.component.scss'
  ]
})
export class NewCaseComponent implements OnInit {

  public caseFormSubmited: boolean = false;
  public TermsAgreement: EPageContents = new EPageContents();

  public genderSource: any[] = [{ value: 'Male', name: 'Male' }, { value: 'Female', name: 'Female' }];
  public addressesSource: AddressData[] = [];
  public isLoading: boolean = true;
  public errorMessageUploadArch: boolean = false;

  public returnedAlertclosed: boolean = false;

  public saving: boolean = false;
  public maxDate: NgbDateStruct = {year:new Date().getFullYear(),month: 1, day: 1} ;
  public startDate: any = {year:new Date().getFullYear()-10,month:1};


  @ViewChild('shippingAddress')
  public shippingAddress: ShippingAddressComponent;

  @ViewChild('wizardForm')
  wizardForm: BaseWizardComponent;

  @ViewChild('caseInfoForm')
  caseInfoForm: FormGroup;

  constructor(public formBuilder: FormBuilder,
    public auth: LoginApiService,
    public api: CaseServiceService,
    private modalService: NgbModal,
    private router: Router,
    public activatedRoute: ActivatedRoute) {
      router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  reloadAddresses(addresses: EShippingAddresses[]) {
    let items: AddressData[] = [];
    if (addresses && addresses.length > 0) {
      this.auth.addresses.forEach(function (item: EShippingAddresses) {
        let a = new AddressData();
        a.address = item;
        items.push(a);
      });
    }
    this.addressesSource = items;
  }

  ngOnInit(): void {
    // console.debug('Init Component');
    this.reloadAddresses(this.auth.addresses);
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
        }
        else {
          alert('No data: ' + a.Message);
        }
      }, error => {
        alert('loading failed');
      });
    }
    else {
      console.debug('no id ' + id);
      this.api.case = new CaseData();
      this.api.case.LowerItems = [];
      this.api.case.UpperItems = [];

      let i = 1;
      while (i <= 16) {
        let item = new ECaseTeeth();
        item.ToothID = "U" + i;
        this.api.case.UpperItems.push(item);
        i = i + 1;
      }
      i = 1;
      while (i <= 16) {
        let item = new ECaseTeeth();
        item.ToothID = "L" + i;
        this.api.case.LowerItems.push(item);
        i = i + 1;
      }
      this.api.setLabels(this.auth.user.NotationSystem);
      this.isLoading = false;
    }

  }

  ngAfterViewInit() {
  }

  openAddressModal() {
    this.shippingAddress.showDlg();

  }


  /**
   * Wizard finish function
   */
  finishFunction() {
    this.router.navigate(['dashboard/cases']);
  }

  saveCaseInformation() {
    this.caseFormSubmited = true;
    this.errorMessageUploadArch = false;
    if (this.caseInfoForm.valid) {
      // console.debug(this.api.case.Data);

      this.api.case.Data.UserID = this.auth.user.ID;

      this.saving = true;
      this.api.saveCase().subscribe(a => {
        this.saving = false;
        if (a.Success) {
          this.api.case.Data.load(a.Case);
          //alert(a.Success);
          this.wizardForm.goToNextStep();
          window.scrollTo(0, 0);
          if (a.TermsAgreement) {
            this.TermsAgreement = new EPageContents();
            this.TermsAgreement.load(a.TermsAgreement);
            console.debug(a.TermsAgreement);
          }
          //this.isForm1Submitted = true;
        }
        else {
          alert(a.Message);
        }
      }, error => {
        this.saving = false;
        console.debug(error);
        alert('Message: ' + error.Message);
      });
    }
  }

  /**
   * Go to next step while form value is valid
   */
  saveCase(page: number) {
    console.debug(this.api.case.Data);
    this.errorMessageUploadArch = false;
    if (page == 1) {
      if (this.api.case.Data.ImpressionType == 'Digital') {
        if (!this.api.case.Data.LowerArchScan || this.api.case.Data.LowerArchScan.length < 5
          || !this.api.case.Data.UpperArchScan || this.api.case.Data.UpperArchScan.length < 5) {
          this.errorMessageUploadArch = true;
          return;
        }
      }
    }
    this.saving = true;
    this.api.saveCase().subscribe(a => {
      this.saving = false;
      if (a.Success) {
        this.api.case.Data.load(a.Case);
        this.wizardForm.goToNextStep();
        window.scrollTo(0, 0);
      }
      else {
        alert(a.Message);
      }
    }, error => {
      this.saving = false;
      console.debug(error);
      alert('Message: ' + error.Message);
    });
  }

  submitCase() {
    console.debug(this.api.case.Data);
    this.api.case.Data.CaseStage = 'PendingCaseApproval';
    this.saving = true;
    this.api.saveCase().subscribe(a => {
      this.saving = false;
      if (a.Success) {
        this.api.case.Data.load(a.Case);
        this.wizardForm.goToNextStep();
        window.scrollTo(0, 0);
      }
      else {
        alert(a.Message);
      }
    }, error => {
      this.saving = false;
      console.debug(error);
      alert('Message: ' + error.Message);
    });
  }


  addressChanged(items: any) {
    console.debug(items);
    this.reloadAddresses(this.auth.addresses);
  }
  // address modal
  
}
