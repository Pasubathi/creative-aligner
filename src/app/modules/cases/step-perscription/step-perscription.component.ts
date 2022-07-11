import { Component, OnInit } from '@angular/core';
import { ECaseTeeth } from '../../../models/data';
import { CaseServiceService } from '../../../providers/case-service.service';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-step-perscription',
  templateUrl: './step-perscription.component.html',
  styleUrls: ['./step-perscription.component.scss']
})
export class StepPerscriptionComponent implements OnInit {

  constructor(public api: CaseServiceService,
    public auth: LoginApiService) { }

  ngOnInit(): void {
    
  }

  maintainAll() {
    this.api.case.Data.InstUpperMidline = 'Maintain';
    this.api.case.Data.InstLowerMidline = 'Maintain';
    this.api.case.Data.Overjet = 'Maintain';
    this.api.case.Data.Overbite = 'Maintain';
    this.api.case.Data.CanineRelationship = 'Maintain';
    this.api.case.Data.MolarRelationship = 'Maintain';
    this.api.case.Data.PosteriorCrossbite = 'Maintain';
  }

  idealizeAll() {
    this.api.case.Data.InstUpperMidline = 'Idealize';
    this.api.case.Data.InstLowerMidline = 'Idealize';
    this.api.case.Data.Overjet = 'Idealize';
    this.api.case.Data.Overbite = 'Idealize';
    this.api.case.Data.CanineRelationship = 'Idealize';
    this.api.case.Data.MolarRelationship = 'Idealize';
    this.api.case.Data.PosteriorCrossbite = 'Idealize';
  }

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
