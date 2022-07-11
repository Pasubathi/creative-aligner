import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { CaseServiceService } from 'src/app/providers/case-service.service';

@Component({
  selector: 'app-step-images',
  templateUrl: './step-images.component.html',
  styleUrls: ['./step-images.component.scss']
})
export class StepImagesComponent implements OnInit {

  // public digitalIsCollapsed = true;
  // public physicallIsCollapsed = true;

  @Input()
  public errorMessageUploadArch: boolean = false;

  constructor(public api: CaseServiceService) { }

  ngOnInit(): void {
  }
}
