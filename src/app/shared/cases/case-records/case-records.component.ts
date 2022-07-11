import { Component, Input, OnInit } from '@angular/core';
import { ECases } from '../../../models/data';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-case-records',
  templateUrl: './case-records.component.html',
  styleUrls: ['./case-records.component.scss']
})
export class CaseRecordsComponent implements OnInit {

  constructor(private api: LoginApiService) { }

  ngOnInit(): void {
  }

  @Input()
  public case: ECases = new ECases();


  downloadArch(kind: any) : string {
    if (kind == 1 && this.case.LowerArchScan) {
      return this.api.getUrl('DataApi', 'GetFile') + '?file=' + this.case.LowerArchScan;
    }
    if (kind == 2 && this.case.UpperArchScan) {
      return this.api.getUrl('DataApi', 'GetFile') + '?file=' + this.case.UpperArchScan;
    }
    return "";
  }
}
