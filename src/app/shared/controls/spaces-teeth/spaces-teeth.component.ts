import { Component, Input, OnInit } from '@angular/core';
import { ECaseTeeth } from '../../../models/data';
import { CaseServiceService } from '../../../providers/case-service.service';

@Component({
  selector: 'app-spaces-teeth',
  templateUrl: './spaces-teeth.component.html',
  styleUrls: ['./spaces-teeth.component.scss']
})
export class SpacesTeethComponent implements OnInit {

  constructor(public api: CaseServiceService) { }

  ngOnInit(): void {
  }

  @Input()
  public UpperItems: ECaseTeeth[] = [];

  @Input()
  public LowerItems: ECaseTeeth[] = [];

  @Input()
  public HasBothLabel: boolean = false;

  @Input()
  public IsReadOnly: boolean = false;

}
