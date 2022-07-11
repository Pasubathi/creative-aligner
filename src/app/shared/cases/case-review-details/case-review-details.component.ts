import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseData } from '../../../models/entities';

@Component({
  selector: 'app-case-review-details',
  templateUrl: './case-review-details.component.html',
  styleUrls: ['./case-review-details.component.scss']
})
export class CaseReviewDetailsComponent implements OnInit {

  constructor(private nav: Router) {
      nav.routeReuseStrategy.shouldReuseRoute = () => false;
     }

  @Input()
  public caseData: CaseData = new CaseData();

 

  ngOnInit(): void {
    
  }

  UpperMidline(): string {
    return this.rangeValue(this.caseData.Data.CondUpperMidlineShift);
  }

  LowerMidline(): string {
    return this.rangeValue(this.caseData.Data.CondLowerMidlineShift);
  }

  public rangeValue(value: number): string {
    if (value == 0) {
      return "Centered to face";
    }
    else if (value > 0) {
      return "Shifted left by " + value + "mm";
    }
    else {
      return "Shifted right by " + Math.abs(value) + "mm";
    }
  }

  public caseInvoice(){
    this.nav.navigate(['/case/case-invoice', { id: this.caseData.Data.ID }]);
  }
}
