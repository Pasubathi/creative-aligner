import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ECases, EPermissionGroups, EPrices, ERevisions, EShippingAddresses, EUserPermissions, EUsers } from '../models/data';

import { AdminCaseSearch, AdminCaseSearchResults, AdminUsersSearchResults, CaseSearch, ChangePasswordModel, DashboardCases, DashboardPackages, DashboardUser, PostPageContent, RequestPageContent } from '../models/entities';
import { ApiClient } from '../shared/apiclient';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService extends ApiClient {

  public MedRepUsers: DashboardUser[] = [];
  public UserGroups: EPermissionGroups[] = [];

  constructor(public httpclient: HttpClient, public nav3: Router) {
    super(httpclient, nav3);
  }

  public getCases(searchData: AdminCaseSearch): Observable<AdminCaseSearchResults> {
    return this.postAdminApi("GetCases", searchData).pipe(map(value => {
      let result = new AdminCaseSearchResults();

      let items: DashboardCases[] = [];
      if (value.Success && value.Cases && value.Cases.length > 0) {
        value.Cases.forEach(function (a: any) {
          var item: DashboardCases = new DashboardCases();
          item.loadData(a);
          items.push(item);
        });
        result.Page = value.Page;
        result.TotalCount = value.TotalCount;
      }
      result.Cases = items;
      return result;
    }));
  }

  public getPendingMessages(searchData: AdminCaseSearch): Observable<any> {
    return this.postAdminApi("GetPendingChat", searchData);
  }

  public getPackages(searchData: AdminCaseSearch): Observable<DashboardPackages[]> {

    return this.postAdminApi("GetPackages", searchData).pipe(map(value => {
      let items: DashboardPackages[] = [];
      if (value.Success && value.Packages && value.Packages.length > 0) {
        value.Packages.forEach(function (a: any) {
          var item: DashboardPackages = new DashboardPackages();
          item.loadData(a);
          items.push(item);
        });
        //result.Page = value.Page;
        //result.TotalCount = value.TotalCount;
      }
      return items;
    }));
  }

  public addPackage(entity: EPrices): Observable<any> {
    return this.postAdminApi('AddPackage', entity);
  }
  public editPackage(entity: EPrices): Observable<any> {
    return this.postAdminApi('EditPackage', entity);
  }

  public removePackage(entity: EPrices): Observable<any> {
    return this.postAdminApi('DeletePackage', entity);
  }

  public removeRevision(entity: ERevisions): Observable<any> {
    return this.postAdminApi('RemoveRevision', entity);
  }

  public editRevisionName(entity: ERevisions): Observable<any> {
    return this.postAdminApi('EditRevisionName', entity);
  }

  public getRevisions(entity: ECases): Observable<any> {
    return this.postAdminApi('GetRevisions', entity);
  }

  public getUsers(searchData: AdminCaseSearch): Observable<AdminUsersSearchResults> {
    return this.postAdminApi("GetUsers", searchData).pipe(map(value => {
      let result = new AdminUsersSearchResults();

      let items: DashboardUser[] = [];
      if (value.Success && value.Users && value.Users.length > 0) {
        value.Users.forEach(function (a: any) {
          var item: DashboardUser = new DashboardUser();
          item.loadData(a);
          items.push(item);
        });
        result.Page = value.Page;
        result.TotalCount = value.TotalCount;
        if (value.MedReps && value.MedReps.length > 0) {
          this.MedRepUsers = this.parseMedRepUsers(value.MedReps);
        }
        if (value.Groups && value.Groups.length > 0) {
          this.UserGroups = this.parseUserGroups(value.Groups);
        }
      }
      result.Users = items;
      return result;
    }));
  }

  public editUser(entity: EUsers): Observable<any> {
    return this.postAdminApi('EditUser', entity);
  }

  public addUser(entity: EUsers): Observable<any> {
    return this.postAdminApi('AddUser', entity);
  }

  public deleteUser(entity: EUsers): Observable<any> {
    return this.postAdminApi('DeleteUser', entity);
  }

  public testEmail(entity: EUsers): Observable<any> {
    return this.postAdminApi('TestEmail', entity);
  }
  

  public getRoles(): Observable<EPermissionGroups[]> {
    return this.postDataApi('GetRoles', {}).pipe(map(value => {
      //console.debug(value);
      let result: EPermissionGroups[] = [];
      if (value && value.Roles && value.Roles.length > 0) {
        value.Roles.forEach(function (item: any) {
          let e = new EPermissionGroups();
          e.load(item);
          result.push(e);
        });
      }
      return result;
    }));

  }

  public getMedicalReps(): Observable<DashboardUser[]> {
    return this.postAdminApi('GetMedicalReps', {}).pipe(map(value => {
      let result: DashboardUser[] = [];
      if (value && value.MedicaReps && value.MedicaReps.length > 0) {
        result = this.parseMedRepUsers(value.MedicaReps);
      }
      return result;
    }));
  }

  public GetPageContent(item: RequestPageContent): Observable<any> {
    return this.postAdminApi('GetPageContents', item);
  }

  public SetPageContent(item: PostPageContent): Observable<any> {
    return this.postAdminApi('SetPageContents', item);
  }


  // Helper Functions
  private parseUserGroups(data: any): EPermissionGroups[] {
    let result: EPermissionGroups[] = [];
    if (data && data.length > 0) {
      data.forEach(function (item: any) {
        let e = new EPermissionGroups();
        e.load(item);
        result.push(e);
      });
    }
    return result;
  }

  private parseMedRepUsers(data: any): DashboardUser[] {
    let result: DashboardUser[] = [];
    if (data && data.length > 0) {
      data.forEach(function (item: any) {
        let e = new DashboardUser();
        e.loadData(item);
        result.push(e);
      });
    }
    return result;
  }

  public addAddress(entity: EShippingAddresses): Observable<any> {
    return this.postAdminApi('AddAddress', entity);
  }

  public editAddress(entity: EShippingAddresses): Observable<any> {
    return this.postAdminApi('EditAddress', entity);
  }

  public removeAddress(entity: EShippingAddresses): Observable<any> {
    return this.postAdminApi('DeleteAddress', entity);
  }

  public changePassword(entity: ChangePasswordModel): Observable<any> {
    return this.postAdminApi('ChangePassword', entity);
  }
}
