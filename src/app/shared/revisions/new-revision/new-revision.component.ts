import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseServiceService } from '../../../providers/case-service.service';
import { LoginApiService } from '../../../providers/login-api.service';
import { WizardComponent as BaseWizardComponent } from 'angular-archwizard';
import { RevisionData } from '../../../models/entities';
import { ERevisionTeeth } from '../../../models/data';
import { IprTeethComponent } from '../ipr-teeth/ipr-teeth.component';
import { TeethMoveChartComponent } from '../teeth-move-chart/teeth-move-chart.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-revision',
  templateUrl: './new-revision.component.html',
  styleUrls: ['./new-revision.component.scss']
})
export class NewRevisionComponent implements OnInit {

  @ViewChild('wizardForm')
  wizardForm: BaseWizardComponent;

  @ViewChild('ipr_teeth')
  ipr_teeth: IprTeethComponent;

  @ViewChild('chart_move_teeth')
  chart_move_teeth: TeethMoveChartComponent;

  @ViewChild('newRevisionInfo')
  newRevisionInfo: FormGroup;

  public newRevisionInfoSub: boolean = false;
  public Data: RevisionData = new RevisionData();
  public addNewRevision: boolean = false;

  constructor(public auth: LoginApiService,
    public api: CaseServiceService,
    private router: Router,
    public activatedRoute: ActivatedRoute) { }

  public isLoading: boolean = false;
  saving_revision: boolean = false;

  ngOnInit(): void {
    
  }

  startNewRevision() {
    this.isLoading = true;
    this.api.getRevision(this.api.case.Data.ID, '', this.auth.user.NotationSystem).subscribe(data => {
      this.isLoading = false;
      if (data.Success) {
        var revision = new RevisionData();
        revision.parse(data.Result);
        this.Data = revision;
        console.debug(this.Data);
        this.addNewRevision = true;
      }
      else {
        alert(data.Message);
      }
    }, error => {
      this.isLoading = false;
      alert('failed to start new revision, due to failure on server side');
      console.debug(error);
    });
  }

  noteStep() {
    this.newRevisionInfoSub = true;
    if (!this.newRevisionInfo.valid) {
      return;
    }

    this.ipr_teeth.Data = this.Data;
    console.debug(this.Data);
    this.wizardForm.goToNextStep();
    window.scrollTo(0, 0);
  }

  iprStep() {
    this.chart_move_teeth.Data = this.Data;
    this.wizardForm.goToNextStep();
    window.scrollTo(0, 0);
  }

  toothMoveStep() {
    console.debug(this.api.case.Data);

    this.saving_revision = true;
    this.Data.Revision.CaseID = this.api.case.Data.ID;
    this.api.addRevision(this.Data).subscribe(a => {
      window.scrollTo(0, 0);
      this.saving_revision = false;
      if (a.Success) {
        this.wizardForm.goToNextStep();
      }
      else {
        alert(a.Message);
      }
    }, error => {
      this.saving_revision = false;
      console.debug(error);
      alert('Message: ' + error.Message);
    });
  }

  stepDone() {
    this.router.navigate(['admin/home']);
  }
}
