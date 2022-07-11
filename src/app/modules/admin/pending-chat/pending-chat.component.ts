import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ECountrys } from 'src/app/models/data';
import { DashboardCases, AdminCaseSearch, BindingDataItem, PendingMessages } from 'src/app/models/entities';
import { AdminApiService } from 'src/app/providers/admin-api.service';
import { LoginApiService } from 'src/app/providers/login-api.service';

@Component({
  selector: 'app-pending-chat',
  templateUrl: './pending-chat.component.html',
  styleUrls: ['./pending-chat.component.scss']
})
export class PendingChatComponent implements OnInit {

  

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
  public caseList: PendingMessages[] = [];
  public SearchModel: AdminCaseSearch = new AdminCaseSearch();

  selected: any[] = [];

  ngOnInit(): void {
    this.doSearchCases();
  }
  
  doSearch() {
    //console.debug('------------------');
    this.TotalCount = 0;
    this.pageNumber = 0;
    this.SearchModel.Page = 0;
    this.doSearchCases();
  }

  doSearchCases() {
    this.loadingIndicator = true;
    this.caseList = [];
    this.SearchModel.Page = this.pageNumber;
    
    if (this.auth.user.Role == 'MedicalRepresentative') {
      this.SearchModel.MedicalRepID = this.auth.user.ID;
    }
    
    this.api.getPendingMessages(this.SearchModel).subscribe(result => {
      console.debug(result);
      this.loadingIndicator = false;
      let items: PendingMessages[] = [];
      if (result.Success) {
        result.Cases.forEach((a: any) => {
          let item: PendingMessages = new PendingMessages();
          item.CaseNumber = a.CaseNumber;
          item.CaseStage = a.CaseStage;
          item.Doctor = a.Doctor;
          item.ID = a.ID;
          item.Message = a.Message;
          item.Patient = a.Patient;
          items.push(item);
        });
        this.caseList = items;
        this.TotalCount = result.TotalCount;
        console.debug(this.caseList);
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
    this.nav.navigate(['/admin/admin-case-review', { id: event.selected[0].ID }]);
  }
}