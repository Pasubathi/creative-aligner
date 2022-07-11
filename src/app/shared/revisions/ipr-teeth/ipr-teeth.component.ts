import { Component, Input, OnInit } from '@angular/core';
import { ERevisionTeeth } from '../../../models/data';
import { RevisionData } from '../../../models/entities';

@Component({
  selector: 'app-ipr-teeth',
  templateUrl: './ipr-teeth.component.html',
  styleUrls: ['./ipr-teeth.component.scss']
})
export class IprTeethComponent implements OnInit {

  @Input()
  public Data: RevisionData;

  IprAmount: ERevisionTeeth;
  IprStep: ERevisionTeeth;
  showInputs: boolean = false;
  EditIptTitle: string = '';

  @Input()
  public IsReadOnly: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showIpr(upper: boolean, i: number) {
    console.debug({ upper, i });
    this.showInputs = false;
    if (upper) {
      this.EditIptTitle = 'Upper Tooth ' + this.Data.UpperIprAmount[i].LabelUp + ' & ' + this.Data.UpperIprAmount[i+1].LabelUp;

      this.IprAmount = this.Data.UpperIprAmount[i];
      this.IprStep = this.Data.UpperIprStep[i];
      setTimeout(() => this.showInputs = true, 250);
    }
    else {
      this.EditIptTitle = 'Lower Tooth ' +
        (this.Data.HasBothLabel ? this.Data.UpperIprAmount[i].LabelDown : this.Data.UpperIprAmount[i].LabelUp)
        + ' & ' +
        (this.Data.HasBothLabel ? this.Data.UpperIprAmount[i+1].LabelDown : this.Data.UpperIprAmount[i+1].LabelUp);

      this.IprAmount = this.Data.LowerIprAmount[i];
      this.IprStep = this.Data.LowerIprStep[i];
      setTimeout(() => this.showInputs = true, 250);
    }
  }
}
