import { Component, Input, OnInit } from '@angular/core';
import { NgxDropzoneComponent } from 'ngx-dropzone';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { CaseServiceService } from '../../../providers/case-service.service';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements OnInit {

  constructor(public api: LoginApiService,
    public caseApi: CaseServiceService) { }



  files: File[] = [];
  public uploading: boolean = false;
  public hasImage: boolean = false;
  public showLabelImage: boolean = false;
  public isUploded: boolean = false;
  public selectedImage: string = '';
  progress = { loaded: 0, total: 0 };

  @Input()
  public ImageTitle: string;

  @Input()
  public ImageID: string;

  @Input()
  public dropZoneStyle: string = "background:url(assets/images/placeholderimages/side.svg); background-size:cover;overflow:hidden;height:160px;width:200px;";

  ngOnInit(): void {
    this.hasImage = this.isValidImage();
    if (this.hasImage) {
      this.showLabelImage = false;
    } else {
      this.showLabelImage = true;
    }
  }

  onUploadError(event: any): void {
    console.debug(event);
  }

  onSelect(event: any): void {
    this.isUploded = false;
    console.debug(event);
    this.files = [];
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.selectedImage = '';
      this.showLabelImage = false;
      this.onFilesAdded(event.addedFiles[0]);
    }
  }

  onRemove(event: any) {
    console.log(event);
    this.files = [];
    // this.files.splice(this.files.indexOf(event), 1);
  }

  isValidImage(): boolean {
    let value = '';
    if (this.ImageID == 'ImageAdditional1') {
      value = this.caseApi.case.Data.ImageAdditional1;
    }
    else if (this.ImageID == 'ImageAdditional2') {
      value = this.caseApi.case.Data.ImageAdditional2;
    }
    else if (this.ImageID == 'ImageCephalometric') {
      value = this.caseApi.case.Data.ImageCephalometric;
    }
    else if (this.ImageID == 'ImageFrontal') {
      value = this.caseApi.case.Data.ImageFrontal;
    }
    else if (this.ImageID == 'ImageFrontNonSmiling') {
      value = this.caseApi.case.Data.ImageFrontNonSmiling;
    }
    else if (this.ImageID == 'ImageFrontSmiling') {
      value = this.caseApi.case.Data.ImageFrontSmiling;
    }
    else if (this.ImageID == 'ImageLeft') {
      value = this.caseApi.case.Data.ImageLeft;
    }
    else if (this.ImageID == 'ImageLower') {
      value = this.caseApi.case.Data.ImageLower;
    }
    else if (this.ImageID == 'ImagePanoramic') {
      value = this.caseApi.case.Data.ImagePanoramic;
    }
    else if (this.ImageID == 'ImageRight') {
      value = this.caseApi.case.Data.ImageRight;
    }
    else if (this.ImageID == 'ImageSide') {
      value = this.caseApi.case.Data.ImageSide;
    }
    else if (this.ImageID == 'ImageUpper') {
      value = this.caseApi.case.Data.ImageUpper;
    }
    if (value && value.length > 10) {
      return true;
    }
    return false;
  }

  getLoadedImg(): string {
    let url = this.api.getUrl('DataApi', 'GetFile')+'?file=';
    if (this.ImageID == 'ImageAdditional1') {
      return url+ this.caseApi.case.Data.ImageAdditional1;
    }
    else if (this.ImageID == 'ImageAdditional2') {
      return url + this.caseApi.case.Data.ImageAdditional2;
    }
    else if (this.ImageID == 'ImageCephalometric') {
      return url + this.caseApi.case.Data.ImageCephalometric;
    }
    else if (this.ImageID == 'ImageFrontal') {
      return url + this.caseApi.case.Data.ImageFrontal;
    }
    else if (this.ImageID == 'ImageFrontNonSmiling') {
      return url + this.caseApi.case.Data.ImageFrontNonSmiling;
    }
    else if (this.ImageID == 'ImageFrontSmiling') {
      return url + this.caseApi.case.Data.ImageFrontSmiling;
    }
    else if (this.ImageID == 'ImageLeft') {
      return url + this.caseApi.case.Data.ImageLeft;
    }
    else if (this.ImageID == 'ImageLower') {
      return url + this.caseApi.case.Data.ImageLower;
    }
    else if (this.ImageID == 'ImagePanoramic') {
      return url + this.caseApi.case.Data.ImagePanoramic;
    }
    else if (this.ImageID == 'ImageRight') {
      return url + this.caseApi.case.Data.ImageRight;
    }
    else if (this.ImageID == 'ImageSide') {
      return url + this.caseApi.case.Data.ImageSide;
    }
    else if (this.ImageID == 'ImageUpper') {
      return url+ this.caseApi.case.Data.ImageUpper;
    }
    return '';
  }

  setPropertyValue(value: any) {
    if (this.ImageID == 'ImageAdditional1') {
      this.caseApi.case.Data.ImageAdditional1 = value;
    }
    else if (this.ImageID == 'ImageAdditional2') {
      this.caseApi.case.Data.ImageAdditional2 = value;
    }
    else if (this.ImageID == 'ImageCephalometric') {
      this.caseApi.case.Data.ImageCephalometric = value;
    }
    else if (this.ImageID == 'ImageFrontal') {
      this.caseApi.case.Data.ImageFrontal = value;
    }
    else if (this.ImageID == 'ImageFrontNonSmiling') {
      this.caseApi.case.Data.ImageFrontNonSmiling = value;
    }
    else if (this.ImageID == 'ImageFrontSmiling') {
      this.caseApi.case.Data.ImageFrontSmiling = value;
    }
    else if (this.ImageID == 'ImageLeft') {
      this.caseApi.case.Data.ImageLeft = value;
    }
    else if (this.ImageID == 'ImageLower') {
      this.caseApi.case.Data.ImageLower = value;
    }
    else if (this.ImageID == 'ImagePanoramic') {
      this.caseApi.case.Data.ImagePanoramic = value;
    }
    else if (this.ImageID == 'ImageRight') {
      this.caseApi.case.Data.ImageRight = value;
    }
    else if (this.ImageID == 'ImageSide') {
      this.caseApi.case.Data.ImageSide = value;
    }
    else if (this.ImageID == 'ImageUpper') {
      this.caseApi.case.Data.ImageUpper = value;
    }
  }

  onFilesAdded(file: File) {

    this.uploading = true;
    const formData = new FormData();
    formData.append("caseID", this.caseApi.case.Data.ID);
    formData.append("userID", this.api.user.ID);
    formData.append("imageid", this.ImageID);
    formData.append('file', file, file.name);

    this.api.postFile(formData).subscribe(
      (data: any) => {
        console.debug(data);
        if (data.type == 1 && data.loaded && data.total) {
          console.debug(data);
          this.progress.loaded = data.loaded;
          this.progress.total = data.total;
        }
        else if (data.body) {
          this.uploading = false;
          this.files.push(file);
          this.setPropertyValue(data.body.FilePath);
          this.hasImage = false;
          this.showLabelImage = false;
          this.isUploded = true;
          this.loadFile(file);
          console.debug("Data Uploaded");
          console.debug(data.body);
        }

      },
      error => {
        this.uploading = false;
        this.isUploded = false;
        console.debug(error);
      });
      
    //   res => {
    //   this.uploading = false;
    //   if (res.Success) {
    //     this.files.push(file);
    //     this.setPropertyValue(res.FilePath);
    //     this.hasImage = false;
    //     this.showLabelImage = false;
    //     this.loadFile(file);
    //    // alert('Uploaded Successfully.');
    //   }
    //   else if (res.Message) {
    //     alert(res.Message);
    //   }
    //   console.log(res);

    // }, error => {
    //   this.uploading = false;
    //   console.log(error);
    //   alert(error.message);
    // });
  }

  private loadFile(file: File) {
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.selectedImage = event.target.result;
    };

    reader.onerror = (event: any) => {
      console.log("File could not be read: " + event.target.error.code);
    };

    reader.readAsDataURL(file);
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        let item = (e.target as FileReader).result;
        return resolve(item!);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }
}
