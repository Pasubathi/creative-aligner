import { Component, Input, OnInit } from '@angular/core';
import { CaseData } from 'src/app/models/entities';
import { LoginApiService } from 'src/app/providers/login-api.service';

@Component({
  selector: 'app-case-shipping',
  templateUrl: './case-shipping.component.html',
  styleUrls: ['./case-shipping.component.scss']
})
export class CaseShippingComponent implements OnInit {

  constructor(private api: LoginApiService) { }

  ngOnInit(): void {
  }

  @Input()
  public case: CaseData = new CaseData();

  downloadFile(file: string): string {
    return this.api.getUrl('DataApi', 'GetFile') + '?file=' + file;
  }

}
