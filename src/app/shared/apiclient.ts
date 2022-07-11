import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { ECountrys, EUserSessions } from "../models/data";
import { Injectable } from '@angular/core';
import { HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import { Router } from "@angular/router";

export class ApiClient {

  public get session(): EUserSessions {
    let entity = new EUserSessions();
    var val = localStorage.getItem('Auth.Session');
    if (val && val.length > 0) {
      var info = JSON.parse(val);
      entity.load(info);
    }
    return entity;
  }
  public set session(entity: EUserSessions) {
    localStorage.setItem('Auth.Session', JSON.stringify(entity));
  }

  constructor(public client: HttpClient,
    public nav: Router) {
  }

  public get countries(): ECountrys[] {
    let entity: ECountrys[] = [];
    var val = localStorage.getItem('Auth.Countrys');
    if (val && val.length > 0) {
      var info = JSON.parse(val);
      if (info && info.length > 0) {
        info.forEach(function (a: any) {
          let item = new ECountrys();
          item.load(a);
          entity.push(item);
        });
      }
    }
    return entity;
  }
  public set countries(entity: ECountrys[]) {
    if (entity && entity.length > 0) {
      localStorage.setItem('Auth.Countrys', JSON.stringify(entity));
    }
  }

  public baseUrl(): string {
    return environment.url;
  }

  public getUrl(controller: string, action: string) {
    return this.baseUrl() + '/' + controller + '/' + action;
  }

  public getHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return headers;
  }

  public getHeaders2(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'auth-token': this.session.UserToken
    });
    return headers;
  }

  public postDataApi(action: string, data: any): Observable<any> {
    return this.client.post(this.getUrl('DataApi', action), data, { headers: this.getHeaders() });
  }

  public postAdminApi(action: string, data: any): Observable<any> {
    return this.client.post(this.getUrl('AdminApi', action), data, { headers: this.getHeaders2() }).pipe(
      catchError((error: any) => {
        if (error.status == 401) {
          this.nav.navigate(['/auth/login']);
        }
        throw error;
      })
    );
  }

  public postNewCaseApi(action: string, data: any): Observable<any> {
    let header = this.getHeaders2();
    console.debug(header)
    return this.client.post(this.getUrl('NewCaseApi', action), data, { headers: header }).pipe(
      catchError((error: any) => {
        if (error.status == 401) {
          this.nav.navigate(['/auth/login']);
        }
        throw error;
      })
    );
  }

  public postApiFile(action: string, data: FormData): Observable<any> {
    let vals: HttpHeaders = new HttpHeaders({
      //'Content-Type': 'multipart/form-data',
      'Accept': '*/*'
      // Authorization: 'my-auth-token'
    });

    let p = new HttpParams();
    const req = new HttpRequest('POST', this.getUrl('DataApi', action), data,
    { 
      headers: vals,
      reportProgress: true,
      params: p
    });
    return this.client.request(req);

    // return this.client.post(this.getUrl('DataApi', action), data, 
    // { 
    //   headers: vals,
    //   reportProgress: true,
    //   params: p
    // });
  }

  // uploadFileData(url: string, file: File): Observable<HttpEvent<any>> {

  //   let formData = new FormData();
  //   let user = {
  //     name : 'Gajender'
  //   }
  //   formData.append('file', file);
  //   formData.append("user", JSON.stringify(user)); 
    
  //   let params = new HttpParams();

  //   const options = {
  //     params: params,
  //     reportProgress: true,
  //   };

  //   const req = new HttpRequest('POST', this.getUrl('DataApi', 'Upload'), formData, options);
  //   return this.client.request(req);
  // }
}
