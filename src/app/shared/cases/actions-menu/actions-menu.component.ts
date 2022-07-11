import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumCaseStages } from 'src/app/models/data';
import { DashboardCases } from 'src/app/models/entities';
import { CaseServiceService } from 'src/app/providers/case-service.service';

@Component({
  selector: 'app-actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.scss']
})
export class ActionsMenuComponent implements OnInit {

  constructor(public nav: Router) { 
      nav.routeReuseStrategy.shouldReuseRoute = () => false; 
    }

  @Input()
  public caseData: DashboardCases = new DashboardCases();

  @Input()
  public api: CaseServiceService ;


  ngOnInit(): void {
  }

  editCase() {
    this.nav.navigate(['/case/newcase', { id: this.caseData.Case.ID }]);
  }
  reviewCase() {
    this.nav.navigate(['/case/case-review', { id: this.caseData.Case.ID }]);
  }
  public caseInvoice(){
    this.nav.navigate(['/case/case-invoice', { id: this.caseData.Case.ID }]);
  }
  // updateCaseStatus(caseStage: EnumCaseStages) {
  //    console.debug(this.caseData);
  //    this.caseData.Case.CaseStage = caseStage;
  //    //this.caseData.Case.ReturnNotes = '';
  //    this.api.case.Data = this.caseData.Case;
  //    this.api.updateCaseStatus().subscribe(a => {
  //      if (a.Success) {
  //        this.nav.navigate(['dashboard/cases']);
  //        window.scrollTo(0, 0);
  //      }
  //      else {
  //        console.debug(a.Message);
  //        alert(a.Message);
  //      }
  //    }, error => {
  //      console.debug(error);
  //      alert('Failed: ' + error.Message);
  //    });
  //  }
}
