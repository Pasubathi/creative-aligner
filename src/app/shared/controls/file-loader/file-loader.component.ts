import { Component, Input, OnInit } from '@angular/core';
import { NgxDropzoneComponent } from 'ngx-dropzone';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { CaseServiceService } from '../../../providers/case-service.service';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-file-loader',
  templateUrl: './file-loader.component.html',
  styleUrls: ['./file-loader.component.scss']
})
export class FileLoaderComponent implements OnInit {

  constructor(public api: LoginApiService,
    public caseApi: CaseServiceService) { }


  progress = { loaded: 0, total: 0 };
  files: File[] = [];
  public uploading: boolean = false;

  @Input()
  public ImageTitle: string;

  @Input()
  public ImageID: string;

  @Input()
  public dropZoneStyle: string = "background:url(assets/images/placeholderimages/side.svg); background-size:cover;overflow:hidden;height:160px;width:200px;";

  @Input()
  public fileType: string = ".stl";

  ngOnInit(): void {
  }

  onUploadError(event: any): void {
    console.debug(event);
  }

  onSelect(event: any): void {
    console.debug(event);
    this.files = [];
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.onFilesAdded(event.addedFiles[0]);
    }
  }

  onRemove(event: any) {
    console.log(event);
    this.files = [];
    // this.files.splice(this.files.indexOf(event), 1);
  }

  setPropertyValue(value: any) {
    if (this.ImageID == 'UpperArchScan') {
      this.caseApi.case.Data.UpperArchScan = value;
    }
    else if (this.ImageID == 'LowerArchScan') {
      this.caseApi.case.Data.LowerArchScan = value;
    }
    else if (this.ImageID == 'ImpressionShippingPolicy') {
      this.caseApi.case.Data.ImpressionShippingPolicy = value;
    }
    else if (this.ImageID == 'TreatmentShippingPolicy') {
      this.caseApi.case.Data.TreatmentShippingPolicy = value;
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
          console.debug("Data Uploaded");
          console.debug(data.body);
        }

      },
      error => {
        this.uploading = false;
        console.debug(error);
      });
    // .subscribe(res => {
    //   this.uploading = false;
    //   if (res.Success) {
    //     this.files.push(file);
    //     this.setPropertyValue(res.FilePath);
    //     // alert('Uploaded Successfully.');
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
