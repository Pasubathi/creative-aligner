import { Injectable } from '@angular/core';
import { CaseData, CaseSearch, CasesSearchResults, DashboardCases, PostCases, PostRevision, RequestRevision, RevisionData, RevisionVO } from '../models/entities';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiClient } from '../shared/apiclient';
import { ECaseHistory, ECaseInbox, ECases, ECaseShipment, ECaseTeeth, ECountrys, EPrices, ERevisions, EShippingAddresses } from '../models/data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CaseServiceService extends ApiClient {

  public case: CaseData = new CaseData();

  constructor(public httpclient: HttpClient, public nav3: Router) {
    super(httpclient, nav3);
  }

  public getCase(id: any): Observable<any> {
    return this.postNewCaseApi('GetCase', { caseID: id });
  }

  public saveCase(): Observable<any> {
    return this.postNewCaseApi('Save', this.case);
  }

  // public updateCaseStatus(): Observable<any> {
  //   return this.postNewCaseApi('UpdateCaseStatus', this.case.Data);
  // }

  public getRevision(caseid: string, id: string, notation: string): Observable<any> {
    let item = new RequestRevision();
    item.CaseID = caseid;
    item.RevisionID = id;
    item.NotationSystem = notation;
    return this.postNewCaseApi('GetRevision', item);
  }

  public getCases(searchData: CaseSearch): Observable<CasesSearchResults> {
    return this.postNewCaseApi("GetCases", searchData).pipe(map(value => {

      let result = new CasesSearchResults();
      let items: DashboardCases[] = [];
      if (value.Success && value.Cases && value.Cases.length > 0) {
        value.Cases.forEach(function(a: any) {
          var item: DashboardCases = new DashboardCases();
          item.loadData(a);
          //item.Package = a.Package;
          items.push(item);
        });
      }
      result.Cases = items;
      result.Page = value.Page;
      result.TotalCount = value.TotalCount;
      return result;
    }));
  }

  setLabels(notationSystem: string) {
    
    if (notationSystem == 'Universal') {
      this.case.HasBothLabel = true;
      let upper: number = 1;
      let lower: number = 32;
      let step1 = 1;
      let step2 = -1;
      this.case.UpperItems.forEach(function (a: ECaseTeeth, index: number) {
        if (upper == 9) {
          upper = 9;
          lower = 24;
        }
        a.LabelUp = upper.toString();
        a.LabelDown = lower.toString();
        upper = upper + step1;
        lower = lower + step2;
      });
    }
    else if (notationSystem == 'FDI') {
      this.case.HasBothLabel = true;
      let upper: number = 18;
      let lower: number = 48;
      let step = -1;
      this.case.UpperItems.forEach(function (a: ECaseTeeth, index: number) {
        if (upper == 10) {
          upper = 21;
          lower = 31;
          step = 1;
        }
        a.LabelUp = upper.toString();
        a.LabelDown = lower.toString();
        upper = upper + step;
        lower = lower + step;
      });
    }
    else {
      this.case.HasBothLabel = false;
      let index_tooth: number = 8;
      this.case.UpperItems.forEach(function (a: ECaseTeeth, index: number) {
        a.LabelUp = index_tooth.toString();
        a.LabelDown = '';
        if (index < 7) {
          index_tooth--;
        }
        else if (index > 7) {
          index_tooth++;
        }
      });
    }
  }

  public readCase(a: any, notationSystem: string) {
    let result = new CaseData();
    result.Data = new ECases();
    result.Data.load(a.Case);
    let hisRecords: ECaseHistory[] = [];
    if (a.HistoryRecords && a.HistoryRecords.length > 0) {
      a.HistoryRecords.forEach(function (a: any) {
        let hisItem = new ECaseHistory();
        hisItem.load(a);
        hisRecords.push(hisItem);
      });
    }
    result.HistoryRecords = hisRecords;

    result.LowerItems = [];
    if (a.Lowers) {
      a.Lowers.forEach((tooth: any) => {
        let item: ECaseTeeth = new ECaseTeeth();
        item.load(tooth);
        result.LowerItems.push(item);
      });
    }

    result.UpperItems = [];
    if (a.Uppers) {
      a.Uppers.forEach((tooth: any) => {
        let item: ECaseTeeth = new ECaseTeeth();
        item.load(tooth);
        result.UpperItems.push(item);
      });
    }

    result.Address = new EShippingAddresses();
    result.Address.load(a.Address);

    let country = "";
    this.countries.forEach(function (a: ECountrys) {
      if (a.ID == result.Address.CountryID) {
        country = a.Country;
      }
    });
    result.Country = country;

    result.Revisions = [];
    if (a.Revisions) {
      a.Revisions.forEach((revision: any) => {
        let item: RevisionVO = new RevisionVO();
        item.loadData(revision);
        result.Revisions.push(item);
      });
    }

    result.Package = new EPrices();
    result.Package.load(a.Package);

    this.case = result;
    
    this.setLabels(notationSystem);

    if (a.CaseShipments) {
      a.CaseShipments.forEach((caseShipment: any) => {
        let item: ECaseShipment = new ECaseShipment();
        item.load(caseShipment);
        if (item.ShipmnetType == 'Treatment'){
          result.CaseTreatmentShipments.push(item); 
        }
        else { //item.ShipmnetType == 'Impressions'
          result.CaseImpressionsShipments.push(item);
        }
      });
    }
  }

  public addRevision(data: RevisionData) : Observable<any> {
    return this.postNewCaseApi('AddRevision', data);
  }

  public reviseRevision(data: PostRevision) {
    return this.postNewCaseApi('ReviseRevision', data);
  }

  public casePost(caseID: string, status: string) {
    let data = new PostCases();
    data.CaseID = caseID;
    data.CurrentStatus = status;
    data.Status = status;
    data.Message = new ECaseInbox();
    return this.postNewCaseApi('PostCase', data);
  }

  public casesPost(data: PostCases) {
    return this.postNewCaseApi('PostCase', data);
  }

  public reviseDesign(data: ERevisions) {
    return this.postNewCaseApi('ReviseDesign', data);
  }

  public addMessage(data: ECaseInbox) : Observable<any> {
    return this.postNewCaseApi('AddMessage', data);
  }
  public getMessages(caseid: string): Observable<any> {
    return this.postNewCaseApi('GetMessages', { caseID: caseid });
  }

  public addCaseShipment(data: ECaseShipment) : Observable<any> {
    return this.postNewCaseApi('AddCaseShipment', data);
  }
  // public getCaseHistory(caseid: string): Observable<any> {
  //   return this.postNewCaseApi('GetCaseHistory', { caseID: caseid });
  // }
}
