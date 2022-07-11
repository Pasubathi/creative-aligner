import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AdminApiService } from 'src/app/providers/admin-api.service';

import { ECountrys, EShippingAddresses, EUsers } from '../../../models/data';
import { LoginApiService } from '../../../providers/login-api.service';
import { ShippingAddressComponent } from '../../../shared/controls/shipping-address/shipping-address.component';
import { UserPasswordComponent } from '../../../shared/controls/user-password/user-password.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public Current: EShippingAddresses = new EShippingAddresses();
  public user: EUsers = new EUsers();
  public isNew: boolean = false;
  public savedSuccess: number = 0;
  public countries: ECountrys[] = [];
  public addresses: EShippingAddresses[] = [];
  public specialities: any[] = [{ value: 'Orthodontist', name: 'Orthodontist' }, { value: 'General Dental Practitioner', name: 'General Dental Practitioner' }, { value: 'Other', name: 'Other' }];

  public notations: any[] = [{ value: 'Universal', name: 'Universal' }, { value: 'Palmer', name: 'Palmer' }, { value: 'FDI', name: 'FDI' }];

  constructor(public auth: LoginApiService,
    public admin: AdminApiService) { }

  ngOnInit(): void {
    let countries: ECountrys[] = [];
    this.auth.countries.forEach(function (a: ECountrys) {
      countries.push(a);
    });
    this.countries = countries;

    let addresses: EShippingAddresses[] = [];
    this.auth.addresses.forEach(function (a: EShippingAddresses) {
      addresses.push(a);
    });
    this.addresses = addresses;
    this.user = this.auth.user;
  }

  @ViewChild('addressCtr')
  addressCtr: ShippingAddressComponent;

  @ViewChild('changePassCtr')
  changePassCtr: UserPasswordComponent;

  editUser() {
    this.savedSuccess = 3;
    this.admin.editUser(this.user).subscribe(e => {
      if (e.Success) {
        this.savedSuccess = 1;
        this.auth.user = this.user;
        this.Current = new EShippingAddresses();
      }
      else {
        this.savedSuccess = 2;
        //alert(e.Message);
      }
    }, error => {
      this.savedSuccess = 2;
      //alert('failed: ' + error.message);
    });
  }

  onAddressesChanged(address: any) {
    let addresses: EShippingAddresses[] = [];
    this.auth.addresses.forEach(function (a: EShippingAddresses) {
      addresses.push(a);
    });
    this.addresses = addresses;
  }

  changePassword() {
    this.changePassCtr.showDlg();
  }

  editAddress(item: EShippingAddresses) {
    this.isNew = false;
    this.Current = item;
    this.addressCtr.showDlg();
  }

  newAddress() {
    this.isNew = true;
    this.Current = new EShippingAddresses();
    this.addressCtr.showDlg();
  }
 }
