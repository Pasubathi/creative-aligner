import { Component, Input, OnInit } from '@angular/core';
import { ECaseHistory } from 'src/app/models/data';

@Component({
  selector: 'app-case-history',
  templateUrl: './case-history.component.html',
  styleUrls: ['./case-history.component.scss']
})
export class CaseHistoryComponent implements OnInit {

  @Input()
  public historyRecords: ECaseHistory[] = [];

  constructor() { }

  ngOnInit(): void {
      // this.api.getCaseHistory(this.api.case.Data.ID).subscribe(result => {
      //   if (result && result.HistoryRecords && result.HistoryRecords.length > 0) {
      //     this.historyRecords = result.HistoryRecords;
      //   }
      // }, error => {
      //   console.debug(error);
      // });
  }

}
