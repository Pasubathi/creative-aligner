import { Component, Input, OnInit } from '@angular/core';
import { RevisionData } from '../../../models/entities';

@Component({
  selector: 'app-teeth-move-chart',
  templateUrl: './teeth-move-chart.component.html',
  styleUrls: ['./teeth-move-chart.component.scss']
})
export class TeethMoveChartComponent implements OnInit {

  @Input()
  public Data: RevisionData;

  constructor() { }

  ngOnInit(): void {
  }

}
