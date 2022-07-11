import { Component, Input, OnInit } from '@angular/core';
import { ECaseTeeth } from '../../../models/data';
import { CaseServiceService } from '../../../providers/case-service.service';

@Component({
  selector: 'app-teeth',
  templateUrl: './teeth.component.html',
  styleUrls: ['./teeth.component.scss']
})
export class TeethComponent implements OnInit {

  constructor(public api: CaseServiceService) { }

  ngOnInit(): void {
    //this.UpperItems = this.api.case.UpperItems;
    //this.LowerItems = this.api.case.LowerItems;
    this
  }

  @Input()
  public ControlKind: string = "Extract";

  @Input()
  public UpperItems: ECaseTeeth[] = [];

  @Input()
  public LowerItems: ECaseTeeth[] = [];

  @Input()
  public HasBothLabel: boolean = false;

  @Input()
  public IsReadOnly: boolean = false;
}
