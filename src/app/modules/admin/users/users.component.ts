import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ECountrys, EPermissionGroups, EUsers } from 'src/app/models/data';
import { AdminCaseSearch, BindingDataItem, DashboardUser } from 'src/app/models/entities';
import { AdminApiService } from 'src/app/providers/admin-api.service';
import { LoginApiService } from 'src/app/providers/login-api.service';
import { UserModalComponent } from 'src/app/shared/controls/user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public api: AdminApiService,
    public auth: LoginApiService,
    public nav: Router) { 
      nav.routeReuseStrategy.shouldReuseRoute = () => false; 
    }

  public loadingIndicator: boolean = false;
  public TotalCount : number= 0;
  public pageNumber : number= 0;
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  public usersList: DashboardUser[] = [];
  public SearchModel: AdminCaseSearch = new AdminCaseSearch();

  public countries: ECountrys[] = [];
  public states: BindingDataItem[] = [];
  public currentRoles: EPermissionGroups[] = [];

  selected: any[] = [];

  public Current: DashboardUser = new DashboardUser();

  ngOnInit(): void {
    let countries: ECountrys[] = [];
    //countries.push(this.getEmptyCountry());
    this.auth.countries.forEach(function (a: ECountrys) {
      countries.push(a);
    });
    this.countries = countries;
    this.currentRoles = this.api.UserGroups;
    this.SearchModel.InitRequest = true;
    this.doSearchUsers();
  }

  //getEmptyCountry(): ECountrys {
  //  let item = new ECountrys();
  //  item.ID = '00000000-0000-0000-0000-000000000000';
  //  item.Country = 'All';
  //  return item;
  //}

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
    //console.debug(this.SearchModel);

    this.loadingIndicator = true;
    this.usersList = [];
    this.SearchModel.Page = this.pageNumber;
    if (this.SearchModel.CountryID == null){
      this.SearchModel.CountryID = '';
    }
    if (this.SearchModel.States == null){
      this.SearchModel.States = '';
    }
    this.SearchModel.OnlyUsers = true;
    this.api.getUsers(this.SearchModel).subscribe(result => {
      //console.debug(result);
      this.loadingIndicator = false;
      if (result && result.Users.length > 0) {
        this.usersList = result.Users;
        this.TotalCount = result.TotalCount;
        //this.pageNumber - result.Page;
      }
      if (this.SearchModel.InitRequest && this.api.UserGroups.length > 0) {
        this.currentRoles = this.api.UserGroups;
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

  //editUser(event: any) {
  //  console.debug('Event: selected ',event.selected[0]);
  //  //TODO Activate User
  //  this.Current = event.selected[0];
  //  this.userCtr.showDlg();
  //}

  onUserChanged(user: any) {
    this.doSearch();
  }

  editItem(row: DashboardUser) {
    this.userCtr.IsNew = false;
    row.User.Password = '';
    this.Current = row;
    this.userCtr.showDlg();
  }

  addUser() {
    this.userCtr.IsNew = true;
    this.Current = new DashboardUser();
    this.Current.User.Password = '';
    this.userCtr.showDlg();
  }
}
