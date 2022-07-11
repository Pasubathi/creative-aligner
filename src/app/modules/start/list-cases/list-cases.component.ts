import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ECases } from '../../../models/data';
import { CaseSearch, DashboardCases } from '../../../models/entities';
import { CaseServiceService } from '../../../providers/case-service.service';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-list-cases',
  templateUrl: './list-cases.component.html',
  styleUrls: ['./list-cases.component.scss']
})
export class ListCasesComponent implements OnInit {

  constructor(public api: CaseServiceService,
    public auth: LoginApiService,
    public nav: Router) { 
      nav.routeReuseStrategy.shouldReuseRoute = () => false; 
    }

  public SearchModel: CaseSearch = new CaseSearch();
  public Cases: DashboardCases[] = [];
  public Page: number = 1;
  public TotalCount: number = 0;
  
  public isLoading: boolean = false;
  public SearchResultEmpty: boolean = false;
  public errorMessage: string = '';

  // @ViewChild('caseActions')
  // public caseActions: CaseActionsComponent;
  // public currentCase: DashboardCases = new DashboardCases();

  ngOnInit(): void {
    this.SearchModel.Page = 1;
    this.doSearchCases();
  }

  pageChange(data: number) {
    //console.debug(data);
    if (this.TotalCount > 5) {
      this.SearchModel.Page = data;
      this.doSearchCases();
    }
  }

  filterChanged() {
    this.TotalCount = 0;
    this.Page = 1;
    this.SearchModel.Page = 1;
    this.Cases = [];
    this.doSearchCases();
  }

  showCase(item: ECases) {
    this.nav.navigate(['/case/newcase', { id: item.ID }]);
  }
  reviewCase(item: ECases) {
    this.nav.navigate(['/case/case-review', { id: item.ID }]);
  }

  doSearchCases() {
    //console.debug(this.SearchModel);
this.errorMessage = '';
    this.isLoading = true;
    this.Cases = [];
    this.SearchModel.UserID = this.auth.user.ID;
    this.api.getCases(this.SearchModel).subscribe(result => {
      this.isLoading = false;
      if (result && result.Cases.length > 0) {
        this.SearchResultEmpty = false;
        this.Cases = result.Cases;
      }
      else this.SearchResultEmpty = true;
      this.TotalCount = result.TotalCount;
      //console.debug(result);
    }, error => {
      this.isLoading = false;
      console.debug(error);
      this.errorMessage = 'Could not reach the server';
    });
  }
}
