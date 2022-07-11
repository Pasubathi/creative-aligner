import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ECountrys, EPrices } from 'src/app/models/data';
import { AdminApiService } from 'src/app/providers/admin-api.service';
import { LoginApiService } from 'src/app/providers/login-api.service';

@Component({
  selector: 'app-package-modal',
  templateUrl: './package-modal.component.html',
  styleUrls: ['./package-modal.component.scss']
})
export class PackageModalComponent implements OnInit {

  public packageTypes: any[] = [{ value: 'ExpressSingle', name: 'Express Single Arch' }, { value: 'ExpressDual', name: 'Express Dual Arch' }, { value: 'LiteSingle', name: 'Lite Single Arch' }, { value: 'LiteDual', name: 'Lite Dual Arch' }, { value: 'Unlimited', name: 'Unlimited' }];

  constructor(public auth: LoginApiService,
    private adminApi: AdminApiService,
    private modalService: NgbModal) { }

  @Input()
  public Current: EPrices = new EPrices();
  public countries: ECountrys[] = [];

  @Input()
  public IsNew: boolean = false;

  @Output()
  public PackageChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('lgModal')
  lgModal: TemplateRef<any>;

  public savingPackage: boolean = false;
  public isDelete: boolean = false;

  ngOnInit(): void {
    let countries: ECountrys[] = [];
    this.auth.countries.forEach(function (a: ECountrys) {
      countries.push(a);
    });
    this.countries = countries;
  }

  public showDlg(): void {
    this.modalService.open(this.lgModal, { size: 'lg', centered: true }).result.then((result) => {
    }).catch((res) => { });
  }

  

  add_Package(modal: any) {
    this.savingPackage = true;

    this.adminApi.addPackage(this.Current).subscribe(e => {
      this.savingPackage = false;
      if (e.Success) {
        //this.auth.readAddress(e.Entities);
        this.PackageChanged.emit();
        modal.close();
        this.Current = new EPrices();
      }
      else {
        this.savingPackage = false;
        alert(e.Message);
      }
    }, error => {
      console.debug(error);
      this.savingPackage = false;
      alert('failed: ' + error.message);
    });
  }

  edit_Package(modal: any) {
    this.savingPackage = true;

    this.adminApi.editPackage(this.Current).subscribe(e => {
      this.savingPackage = false;
      if (e.Success) {
        //this.auth.readAddress(e.Entities);
        this.PackageChanged.emit();
        modal.close();
        this.Current = new EPrices();
      }
      else {
        this.savingPackage = false;
        alert(e.Message);
      }
    }, error => {
      console.debug(error);
      this.savingPackage = false;
      alert('failed: ' + error.message);
    });
  }

  delete_Package(modal: any) {
    this.savingPackage = true;
    this.isDelete = true;

    this.adminApi.removePackage(this.Current).subscribe(e => {
      this.savingPackage = false;
      this.isDelete = false;
      if (e.Success) {
        // this.auth.readAddress(e.Entities);
        this.PackageChanged.emit();
        modal.close();
        this.Current = new EPrices();
      }
      else {
        alert(e.Message);
      }
    }, error => {
      console.debug(error);
      this.isDelete = false;
      this.savingPackage = false;
      alert('failed: ' + error.message);
    });  
  }

}
