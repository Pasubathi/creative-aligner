import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ERevisions } from 'src/app/models/data';
import { FileAttachment, PostRevision, RemoveAttachment } from 'src/app/models/entities';
import { CaseServiceService } from 'src/app/providers/case-service.service';
import { LoginApiService } from 'src/app/providers/login-api.service';

@Component({
  selector: 'app-post-revision',
  templateUrl: './post-revision.component.html',
  styleUrls: ['./post-revision.component.scss']
})
export class PostRevisionComponent implements OnInit {
  public Data: PostRevision = new PostRevision();
  
  constructor(public auth: LoginApiService,
    public api: CaseServiceService,
    private nav: Router,
    private modalService: NgbModal) { }

  @ViewChild('lgModal')
  lgModal: TemplateRef<any>;

  // @ViewChild('selectfile') el: ElementRef;   //in html we make variable of selectfile
  progress = { loaded: 0, total: 0 };

  public isSaving: boolean = false;
  public isLoaded: boolean = false;
  public errorMessage: string = '';
  public isError: boolean = false;
  public isLoading: boolean = false;
  public uploadedFiles: FileAttachment[] = [];
  public currentFiles: any[] = [];

  ngOnInit(): void {
  }

  public showDlg(status: string, revision: ERevisions): void {
    this.Data.Status = status;
    this.Data.Revision = revision;
    this.isSaving = false;
    this.isError = false;
    this.modalService.open(this.lgModal, { size: 'lg', centered: true }).result.then((result) => {}).catch((res) => { });
  }

  postRevision(modal: any) {
    this.isSaving = true;
    this.isError = false;
    this.api.reviseRevision(this.Data).subscribe(e => {
      this.isSaving = false;
      if (e.Success) {
        modal.close();
        if (this.auth.isDoctor()){
          this.nav.navigate(['dashboard/cases']);
        }
        else {
          this.nav.navigate(['/admin/admin-case-review', { id: this.Data.Revision.CaseID }]);
        }
      }
      else {
        this.isError = true;
        this.errorMessage = e.Message;
      }
    }, error => {
      this.isSaving = false;
      this.isError = true;
      console.debug(error);
      this.errorMessage = 'Could not reach the server';
    });
  }

  public addFile(file: string, path: string) {
    let items: FileAttachment[] = [];
    this.uploadedFiles.forEach((a: FileAttachment) => {
      items.push(a);
    });
    let temp: FileAttachment = new FileAttachment();
    temp.file = file;
    temp.path = path;
    items.push(temp);

    this.Data.Message.Attachment = items.length > 0 ? items[0].path : '';
    this.Data.Message.Attachment2 = items.length > 1 ? items[1].path : '';
    this.Data.Message.Attachment3 = items.length > 2 ? items[2].path : '';
    this.Data.Message.Attachment4 = items.length > 3 ? items[3].path : '';
    this.Data.Message.Attachment5 = items.length > 4 ? items[4].path : '';
    this.uploadedFiles = items;
  }

  public removeFile(file: FileAttachment) {
    let items: FileAttachment[] = [];
    if (file) {
      this.uploadedFiles.forEach((a: FileAttachment) => {
        if (a.path != file.path) {
          items.push(a);
        }
      });
    }
    this.Data.Message.Attachment = items.length > 0 ? items[0].path : '';
    this.Data.Message.Attachment2 = items.length > 1 ? items[1].path : '';
    this.Data.Message.Attachment3 = items.length > 2 ? items[2].path : '';
    this.Data.Message.Attachment4 = items.length > 3 ? items[3].path : '';
    this.Data.Message.Attachment5 = items.length > 4 ? items[4].path : '';
    this.uploadedFiles = items;
  }

  removeAttachment(item: FileAttachment) {
    console.debug(item);
    let file: RemoveAttachment = new RemoveAttachment();
    file.Attachment = item.path;
    this.auth.removeAttachment(file)
      .subscribe(
        (data: any) => {
          console.debug(data);
          if (data.Success) {
            this.removeFile(item);
          }

        },
        error => {
          console.debug(error);
        }
      );
  }

  uploadFile(el: HTMLInputElement) {
    if (el.files == null)
    {return;}

    let count: number = el.files?.length;
    if (count == 0) {
      return;
    }

    let i = 0;
    while ( i<count && i<5 && (this.uploadedFiles.length + i) < 5) {
      this.currentFiles.push(el.files[i]);
      i++;
    }
    this.doUpload(); 
  }

  doUpload(){
    if (this.uploadedFiles.length >= 5 || this.currentFiles.length == 0) {
      this.currentFiles = [];
      return;
    }

    this.isLoaded = false;
    this.isLoading = true;
    var file = this.currentFiles.pop(); // this.el.nativeElement.files[0];
    
    // this.fileName = file.name;

    const formData = new FormData();
    formData.append("caseID", this.api.case.Data.ID);
    formData.append("userID", this.auth.user.ID);
    formData.append("imageid", "ChatAttachment");//file.name);
    formData.append('file', file, file.name);

    this.auth.uploadWithId(formData)
      .subscribe(
        (data: any) => {
          console.debug(data);
          if (data.type == 1 && data.loaded && data.total) {
            this.progress.loaded = data.loaded;
            this.progress.total = data.total;
          }
          else if (data.body) {
            this.isLoading = false;
            this.isLoaded = true;
            // this.NewMessage.Attachment = data.body.FilePath;
            this.addFile(file.name, data.body.FilePath);
            console.debug("Data Uploaded");
            console.debug(data.body);
            this.doUpload();
          }

        },
        error => {
          this.isLoading = false;
          console.debug(error);
        }
      );
  }
}
