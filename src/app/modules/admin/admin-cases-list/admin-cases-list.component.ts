import { Component, OnInit, ViewChild } from '@angular/core';
import { NgSelectOption } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOption, NgSelectComponent } from '@ng-select/ng-select';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ECases, ECountrys } from '../../../models/data';
import { AdminCaseSearch, BindingDataItem, CaseSearch, DashboardCases } from '../../../models/entities';
import { AdminApiService } from '../../../providers/admin-api.service';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-admin-cases-list',
  templateUrl: './admin-cases-list.component.html',
  styleUrls: ['./admin-cases-list.component.scss']
})
export class AdminCasesListComponent implements OnInit {

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
  public caseList: DashboardCases[] = [];
  public SearchModel: AdminCaseSearch = new AdminCaseSearch();

  public countries: ECountrys[] = [];
  public states: BindingDataItem[] = [];

  selected: any[] = [];

  ngOnInit(): void {
    let countries: ECountrys[] = [];
    countries.push(this.getEmptyCountry());
    this.auth.countries.forEach(function (a: ECountrys) {
      countries.push(a);
    });
    this.countries = countries;
    this.states = this.getStates();
    this.doSearchCases();
  }

  getStates(): BindingDataItem[] {
    let items: BindingDataItem[] = [];
    items.push(this.getState('', 'All'));
    items.push(this.getState('Incomplete', 'Incomplete Case'));
    items.push(this.getState('PendingCaseApproval', 'Pending Case Approval'));
    items.push(this.getState('Returned', 'Returned'));
    items.push(this.getState('Accepted', 'Accepted'));
    items.push(this.getState('RequestRetainer', 'Request Retainer')); 
    items.push(this.getState('ReadyForImpressionsCollection', 'Impressions Collection'));
    items.push(this.getState('ImpressionsShipped', 'Impressions Shipped'));
    items.push(this.getState('ImpressionsReceived', 'Impressions Received'));
    items.push(this.getState('PendingOrthodontistApproval', 'Pending Orthodontist Approval'));
    items.push(this.getState('AmendRevision', 'Request Revision Amendment'));
    items.push(this.getState('PendingTSApproval', 'Pending TS Approval'));
    items.push(this.getState('RequestNewRevision', 'Request New Revision'));
    items.push(this.getState('Manufacturing', 'Manufacturing'));
    items.push(this.getState('Approved', 'Approved'));
    items.push(this.getState('ReadyForShipping', 'Ready For Shipping'));
    items.push(this.getState('Active', 'Active'));
    items.push(this.getState('RequestNextShipment', 'Request Next Shipment'));
    items.push(this.getState('ReplaceMissing', 'Replace Missing'));
    items.push(this.getState('RequestRefinments', 'request Refinements'));
    items.push(this.getState('RequestMidcourseAdjusment', 'Request Midcourse Adjusment'));
    items.push(this.getState('Completed', 'Completed'));
    items.push(this.getState('Archived', 'Archived'));
    return items;
  }

  getState(id: string, name: string): BindingDataItem {
    let item = new BindingDataItem();
    item.ID = id;
    item.Name = name;
    return item;
  }

  getEmptyCountry(): ECountrys {
    let item = new ECountrys();
    item.ID = '00000000-0000-0000-0000-000000000000';
    item.Country = 'All';
    return item;
  }

  doSearch() {
    //console.debug('------------------');
    this.TotalCount = 0;
    this.pageNumber = 0;
    this.SearchModel.Page = 0;
    this.doSearchCases();
  }

  doSearchCases() {
    //console.debug(this.SearchModel);

    this.loadingIndicator = true;
    this.caseList = [];
    this.SearchModel.Page = this.pageNumber;
    if (this.SearchModel.CountryID == null){
      this.SearchModel.CountryID = this.getEmptyCountry().ID;
    }
    if (this.SearchModel.States == null){
      this.SearchModel.States = '';
    }

    if (this.auth.user.Role == 'MedicalRepresentative') {
      this.SearchModel.MedicalRepID = this.auth.user.ID;
    }
    
    // this removed because set medical rep only if current user is medic rep
    // this.SearchModel.UserID = this.auth.user.ID;
    this.api.getCases(this.SearchModel).subscribe(result => {
      console.debug(result);
      this.loadingIndicator = false;
      if (result && result.Cases.length > 0) {
        this.caseList = result.Cases;
        this.TotalCount = result.TotalCount;
        //this.pageNumber - result.Page;
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
      this.doSearchCases();
    }
    // sorts: Array(1)
    // 0: {dir: 'asc', prop: 'CaseNumber'}
  }

  public setPage(info: any) {
    console.debug(info);
    this.pageNumber = info.offset;
    this.doSearchCases();
  }

  reviewCase(event: any) {
    //console.debug('Event: selected ',event.selected[0]);
    this.nav.navigate(['/admin/admin-case-review', { id: event.selected[0].Case.ID }]);
  }
}
