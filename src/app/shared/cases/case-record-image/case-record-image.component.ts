import { Component, Input, OnInit } from '@angular/core';
import { ECases } from '../../../models/data';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-case-record-image',
  templateUrl: './case-record-image.component.html',
  styleUrls: ['./case-record-image.component.scss']
})
export class CaseRecordImageComponent implements OnInit {

  constructor(private api: LoginApiService) { }

  public hasImage: boolean = false;

  @Input()
  public case: ECases = new ECases();

  @Input()
  public ImageTitle: string;

  @Input()
  public ImageID: string;

  @Input()
  public dropZoneStyle: string = "background:url(assets/images/placeholderimages/side.svg); background-size:cover;overflow:hidden;height:160px;width:200px;";

  ngOnInit(): void {
    this.hasImage = this.isValidImage();
  }

  isValidImage(): boolean {
    let value = '';
    if (this.ImageID == 'ImageAdditional1') {
      value = this.case.ImageAdditional1;
    }
    else if (this.ImageID == 'ImageAdditional2') {
      value = this.case.ImageAdditional2;
    }
    else if (this.ImageID == 'ImageCephalometric') {
      value = this.case.ImageCephalometric;
    }
    else if (this.ImageID == 'ImageFrontal') {
      value = this.case.ImageFrontal;
    }
    else if (this.ImageID == 'ImageFrontNonSmiling') {
      value = this.case.ImageFrontNonSmiling;
    }
    else if (this.ImageID == 'ImageFrontSmiling') {
      value = this.case.ImageFrontSmiling;
    }
    else if (this.ImageID == 'ImageLeft') {
      value = this.case.ImageLeft;
    }
    else if (this.ImageID == 'ImageLower') {
      value = this.case.ImageLower;
    }
    else if (this.ImageID == 'ImagePanoramic') {
      value = this.case.ImagePanoramic;
    }
    else if (this.ImageID == 'ImageRight') {
      value = this.case.ImageRight;
    }
    else if (this.ImageID == 'ImageSide') {
      value = this.case.ImageSide;
    }
    else if (this.ImageID == 'ImageUpper') {
      value = this.case.ImageUpper;
    }
    if (value && value.length > 10) {
      return true;
    }
    return false;
  }

  getLoadedImg(): string {
    let url = this.api.getUrl('DataApi', 'GetFile') + '?file=';
    if (this.ImageID == 'ImageAdditional1') {
      return url + this.case.ImageAdditional1;
    }
    else if (this.ImageID == 'ImageAdditional2') {
      return url + this.case.ImageAdditional2;
    }
    else if (this.ImageID == 'ImageCephalometric') {
      return url + this.case.ImageCephalometric;
    }
    else if (this.ImageID == 'ImageFrontal') {
      return url + this.case.ImageFrontal;
    }
    else if (this.ImageID == 'ImageFrontNonSmiling') {
      return url + this.case.ImageFrontNonSmiling;
    }
    else if (this.ImageID == 'ImageFrontSmiling') {
      return url + this.case.ImageFrontSmiling;
    }
    else if (this.ImageID == 'ImageLeft') {
      return url + this.case.ImageLeft;
    }
    else if (this.ImageID == 'ImageLower') {
      return url + this.case.ImageLower;
    }
    else if (this.ImageID == 'ImagePanoramic') {
      return url + this.case.ImagePanoramic;
    }
    else if (this.ImageID == 'ImageRight') {
      return url + this.case.ImageRight;
    }
    else if (this.ImageID == 'ImageSide') {
      return url + this.case.ImageSide;
    }
    else if (this.ImageID == 'ImageUpper') {
      return url + this.case.ImageUpper;
    }
    return '';
  }
}

