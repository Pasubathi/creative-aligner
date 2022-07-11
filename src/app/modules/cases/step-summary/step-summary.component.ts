import { Component, Input, OnInit } from '@angular/core';
import { CaseServiceService } from 'src/app/providers/case-service.service';
import { EPageContents } from '../../../models/data';

@Component({
  selector: 'app-step-summary',
  templateUrl: './step-summary.component.html',
  styleUrls: ['./step-summary.component.scss']
})
export class StepSummaryComponent implements OnInit {

  @Input()
  public TermsAgreement: EPageContents = new EPageContents();

  constructor(public api: CaseServiceService) { }

  ngOnInit(): void {
  }

  //TODO move this function to a shared Util class
  public rangeValue(value:string): string {
    if(parseFloat(value) == 0){
      return "Centered to face";
    }
    else if(parseFloat(value) > 0){
      return "Shifted left by "+value+"mm";
    }
    else{
      return "Shifted right by "+Math.abs(parseFloat(value))+"mm";
    }
  }

}
