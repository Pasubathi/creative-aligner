import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ECountrys, EShippingAddresses, EUsers, EUserSessions } from '../models/data';
import { ApiClient } from '../shared/apiclient';
import { AddressData, ChangePasswordModel, RemoveAttachment, ResetPassword } from '../models/entities';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService extends ApiClient {

  public get user(): EUsers {
    let user = new EUsers();
    var val = localStorage.getItem('Auth.User');
    if (val && val.length > 0) {
      var info = JSON.parse(val);
      user.load(info);
    }
    return user;
  }
  public set user(user: EUsers) {
    localStorage.setItem('Auth.User', JSON.stringify(user));
  }
  
  public get addresses(): EShippingAddresses[] {
    let entity: EShippingAddresses[] = [];
    var val = localStorage.getItem('Auth.ShippingAddresses');
    if (val && val.length > 0) {
      var info = JSON.parse(val);
      if (info && info.length > 0) {
        info.forEach(function (a: any) {
          let item = new EShippingAddresses();
          item.load(a);
          entity.push(item);
        });
      }
    }
    return entity;
  }
  public set addresses(entity: EShippingAddresses[]) {
    localStorage.setItem('Auth.ShippingAddresses', JSON.stringify(entity));
  }

  //public get permissions(): EUserPermissions[] {
  //  let entity: EUserPermissions[] = [];
  //  var val = localStorage.getItem('Auth.Permissions');
  //  if (val && val.length > 0) {
  //    var info = JSON.parse(val);
  //    if (info && info.length > 0) {
  //      info.forEach(function (a: any) {
  //        let item = new EUserPermissions();
  //        item.load(a);
  //        entity.push(item);
  //      });
  //    }
  //  }
  //  return entity;
  //}
  //public set permissions(entity: EUserPermissions[]) {
  //  localStorage.setItem('Auth.Permissions', JSON.stringify(entity));
  //}

  public isLogged(): boolean {
    let user = this.user;
    if (user && user.Email && user.Email.length > 0 && user.Email.indexOf('@') > 0) {
      return true;
    }
    return false;
  }

  public isMemeber(): boolean {
    if (this.isLogged()) {
      return this.user.Role != undefined && this.user.Role.length > 0;
    }
    return false;
  }

  public getCountry(id: string): string {
    let country: ECountrys = new ECountrys();
    this.countries.forEach(function (item: ECountrys) {
      if (item.ID == id) {
        country = item;
      }
    });
    return country.Country;
  }

  constructor(private httpClient: HttpClient, public nav3: Router) {
    super(httpClient, nav3);
    //console.debug('login service: debug message');

    //console.debug(val);
    //this.reloadInfo();
  }

  //public reloadInfo(): void {
  //  var val = localStorage.getItem('UserLoginInfo');
  //  if (val && val.length > 0) {
  //    var info = JSON.parse(val);
  //    this.readInfo(info);
  //    console.debug(info);
  //  }
  //}

  public doRegister(user: EUsers): Observable<any> {
    console.debug(user);
    return this.postDataApi('DoRegister', user);
  }

  public getCountries(): Observable<any> {
    return this.postDataApi('GetCountries', {});
  }

  // public EditUser(user: EUsers): Observable<any> {
  //   return this.postDataApi('EditUser', user);
  // }
  
  public parseUserInfo(a: any) {
    // console.debug(a);

    let session = new EUserSessions();
    session.load(a.Session);
    this.session = session;

    let user = new EUsers();
    user.load(a.User);
    this.user = user;

    let countries: ECountrys[] = [];
    if (a.Countries && a.Countries.length > 0) {
      a.Countries.forEach(function (c: any) {
        let item = new ECountrys();
        item.load(c);
        countries.push(c);
      });
    }
    this.countries = countries;

    let addresses: EShippingAddresses[] = [];
    if (a.Addresses && a.Addresses.length > 0) {
      a.Addresses.forEach(function (c: any) {
        let item = new EShippingAddresses();
        item.load(c);
        addresses.push(c);
      });
    }
    this.addresses = addresses;

    //let permissions: EUserPermissions[] = [];
    //if (a.Permissions && a.Permissions.length > 0) {
    //  a.Permissions.forEach(function (c: any) {
    //    let item = new EUserPermissions();
    //    item.load(c);
    //    permissions.push(c);
    //  });
    //}
    //this.permissions = permissions;

    //this.saveInfo();
  }

  public sendResetEmail(email: any): Observable<any> {
    let user = new EUsers();
    user.Email = email;
    return this.postDataApi('sendResetEmail', user);
  }

  public doResetPassword(data: ResetPassword): Observable<any> {
    return this.postDataApi('doResetPassword', data);
  }

  public doLogin(entity: EUsers): Observable<any> {
    return this.postDataApi('Dologin', entity);
  }
  
  

  public getAddressData(): AddressData[] {
    let items: AddressData[] = [];
    this.addresses.forEach(function (a: EShippingAddresses) {
      let item = new AddressData();
      item.address = a;
      items.push(item);
    });
    return items;
  }

  public readAddress(entities: any) {
    let items: EShippingAddresses[] = [];
    if (entities && entities.length > 0) {
      entities.forEach(function (e: any) {
        let item: EShippingAddresses = new EShippingAddresses();
        item.load(e);
        items.push(item);
      });
    }
    this.addresses = items;
  }

  public postFile(data: FormData): Observable<any> {
    return this.postApiFile("Upload", data);
  }

  public uploadWithId(data: FormData): Observable<any> {
    return this.postApiFile("UploadWithId", data);
  }

  public removeAttachment(entity: RemoveAttachment): Observable<any> {
    console.debug(entity);
    return this.postDataApi('RemoveAttachment', entity);
  }
  
  public doLogout(entity: EUsers): Observable<any> {
    
    this.session = new EUserSessions();
    this.user = new EUsers();
    this.addresses = [];
    //this.permissions = [];
    return this.postDataApi('DoLogout', entity);
  }

  public isDoctor() : boolean{
    return !this.user.Role || this.user.Role.length == 0;
  }
  public isAdmin():boolean{
    return this.user.Role == 'Admin';
  }
  public isDesigner():boolean{
    return this.user.Role == 'Designer' || this.user.Role == 'Admin';
  }
  public isAccountant():boolean{
    return this.user.Role == 'Accountant' || this.user.Role == 'Admin';
  }
  public isMedicalRepresentative():boolean{
    return this.user.Role == 'MedicalRepresentative' || this.user.Role == 'Admin';
  }
  public isOrthodontist():boolean{
    return this.user.Role == 'Orthodontist' || this.user.Role == 'Admin';
  }
  public isOperationManager():boolean{
    return this.user.Role == 'OperationManager' || this.user.Role == 'Admin';
  }
  public isLogistics():boolean{
    return this.user.Role == 'Logistics' || this.user.Role == 'Admin';
  }
}
