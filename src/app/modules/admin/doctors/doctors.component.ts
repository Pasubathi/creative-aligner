import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ECountrys } from '../../../models/data';
import { AdminCaseSearch, BindingDataItem, DashboardUser } from '../../../models/entities';
import { AdminApiService } from '../../../providers/admin-api.service';
import { LoginApiService } from '../../../providers/login-api.service';
import { UserModalComponent } from '../../../shared/controls/user-modal/user-modal.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {

  public medicalReps: DashboardUser[] = [];

  constructor(public api: AdminApiService,
    public auth: LoginApiService,
    public nav: Router) {
    nav.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public loadingIndicator: boolean = false;
  public TotalCount: number = 0;
  public pageNumber: number = 0;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  public usersList: DashboardUser[] = [];
  public SearchModel: AdminCaseSearch = new AdminCaseSearch();

  public countries: ECountrys[] = [];
  public states: BindingDataItem[] = [];

  selected: any[] = [];

  public Current: DashboardUser = new DashboardUser();

  ngOnInit(): void {
    //let countries: ECountrys[] = [];
    //countries.push(this.getEmptyCountry());
    //this.auth.countries.forEach(function (a: ECountrys) {
    //  countries.push(a);
    //});
    this.fillMedicRep();
    this.countries = this.auth.countries;
    this.SearchModel.InitRequest = true;
    this.doSearchUsers();
  }

  fillMedicRep() {
    if (this.auth.user.Role == 'MedicalRepresentative') {
      let medics: DashboardUser[] = [];
      this.api.MedRepUsers.forEach((a: DashboardUser) => {
        if (a.ID == this.auth.user.ID) {
          medics.push(a);
        }
      });
      this.medicalReps = medics;
      console.debug(this.medicalReps);
    }
    else {
      this.medicalReps = this.api.MedRepUsers;
    }
  }

  // getEmptyCountry(): ECountrys {
  //   let item = new ECountrys();
  //   item.ID = '00000000-0000-0000-0000-000000000000';
  //   item.Country = 'All';
  //   return item;
  // }

  @ViewChild('userCtr')
  userCtr: UserModalComponent;


  doSearch() {
    //console.debug('------------------');
    this.TotalCount = 0;
    this.pageNumber = 0;
    this.SearchModel.Page = 0;
    this.SearchModel.InitRequest = false;
    this.doSearchUsers();
  }

  doSearchUsers() {
    console.debug(this.auth.user);

    this.loadingIndicator = true;
    this.usersList = [];
    this.SearchModel.Page = this.pageNumber;
    if (this.SearchModel.CountryID == null) {
      this.SearchModel.CountryID = '';
    }
    if (this.SearchModel.States == null) {
      this.SearchModel.States = '';
    }

    if (this.auth.user.Role == 'MedicalRepresentative') {
      this.SearchModel.MedicalRepID = this.auth.user.ID;
    }

    this.api.getUsers(this.SearchModel).subscribe(result => {
      console.debug(result);
      this.loadingIndicator = false;
      if (result && result.Users.length > 0) {
        this.usersList = result.Users;
        this.TotalCount = result.TotalCount;
        //this.pageNumber - result.Page;
      }
      if (this.SearchModel.InitRequest && this.api.MedRepUsers.length > 0) {
        this.fillMedicRep();
      }
    }, error => {
      this.loadingIndicator = false;
      console.debug(error);
      if (error.message) {
        alert(error.message);
      } else {
        alert('Failed');
      }
    });
  }

  public onSort(info: any) {
    console.debug(info);
    if (info && info.sorts && info.sorts.length > 0) {
      this.SearchModel.SortDir = info.sorts[0].dir;
      this.SearchModel.SortProp = info.sorts[0].prop;
      this.doSearchUsers();
    }
    // sorts: Array(1)
    // 0: {dir: 'asc', prop: 'CaseNumber'}
  }

  public setPage(info: any) {
    console.debug(info);
    this.pageNumber = info.offset;
    this.doSearchUsers();
  }

  onUserChanged(user: any) {
    this.doSearch();
  }

  editItem(row: DashboardUser) {
    this.Current = row;
    this.userCtr.showDlg();
  }
}
