import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, Input, OnInit, Output, TemplateRef, ViewChild, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminApiService } from 'src/app/providers/admin-api.service';
import { ECountrys, EShippingAddresses } from '../../../models/data';
import { AddressData } from '../../../models/entities';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {

  constructor(public auth: LoginApiService,
    public admin: AdminApiService,
    private modalService: NgbModal) { }

  @Input()
  public Current: EShippingAddresses = new EShippingAddresses();
  public countries: ECountrys[] = [];

  @Input()
  public IsNew: boolean = false;

  @Output()
  public AddressesChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('lgModal')
  lgModal: TemplateRef<any>;

  public savingAddress: boolean = false;
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

  

  add_Address(modal: any) {
    this.Current.UserID = this.auth.user.ID;
    this.savingAddress = true;

    this.admin.addAddress(this.Current).subscribe(e => {
      this.savingAddress = false;
      if (e.Success) {
        this.auth.readAddress(e.Entities);
        this.AddressesChanged.emit(this.auth.addresses);
        modal.close();
        this.Current = new EShippingAddresses();
      }
      else {
        this.savingAddress = false;
        alert(e.Message);
      }
    }, error => {
      this.savingAddress = false;
      alert('failed: ' + error.message);
    });
  }

  edit_Address(modal: any) {
    this.Current.UserID = this.auth.user.ID;
    this.savingAddress = true;

    this.admin.editAddress(this.Current).subscribe(e => {
      this.savingAddress = false;
      if (e.Success) {
        this.auth.readAddress(e.Entities);
        modal.close();
        this.Current = new EShippingAddresses();
      }
      else {
        this.savingAddress = false;
        alert(e.Message);
      }
    }, error => {
      this.savingAddress = false;
      alert('failed: ' + error.message);
    });
  }

  delete_Address(modal: any) {
    this.Current.UserID = this.auth.user.ID;
    this.savingAddress = true;
    this.isDelete = true;

    this.admin.removeAddress(this.Current).subscribe(e => {
      this.savingAddress = false;
      this.isDelete = false;
      if (e.Success) {
        this.auth.readAddress(e.Entities);
        modal.close();
        this.Current = new EShippingAddresses();
      }
      else {
        alert(e.Message);
      }
    }, error => {
      this.isDelete = false;
      this.savingAddress = false;
      alert('failed: ' + error.message);
    });
  }

}
