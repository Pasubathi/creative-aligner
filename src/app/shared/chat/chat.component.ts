import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { ECaseInbox } from 'src/app/models/data';
import { FileAttachment, RemoveAttachment } from 'src/app/models/entities';
import { CaseServiceService } from 'src/app/providers/case-service.service';
import { LoginApiService } from 'src/app/providers/login-api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {

  // defaultNavActiveId = 1;
  public NewMessage: ECaseInbox;
  public messagesList: ECaseInbox[] = [];
  public isLoading: boolean = false;
  public isLoaded: boolean = false;
  public uploadedFiles: FileAttachment[] = [];
  public currentFiles: any[] = [];

  constructor(public api: CaseServiceService,
    public auth: LoginApiService) { }

  ngAfterViewInit(): void {

    document.querySelector('.chat-content')!.classList.toggle('show');

  }

  ngOnInit(): void {
    this.NewMessage = new ECaseInbox();
    this.getCaseMessages();
  }

  getCaseMessages() {

    this.api.getMessages(this.api.case.Data.ID).subscribe(result => {

      if (result && result.Messages && result.Messages.length > 0) {
        this.messagesList = result.Messages;

      }
    }, error => {
      console.debug(error);

    });
  }

  public addMessage() {
    if (this.NewMessage.Message.length == 0) {
      return;
    }
    this.NewMessage.CaseID = this.api.case.Data.ID;
    this.NewMessage.UserID = this.auth.user.ID;
    // console.debug("Saving new Message: "+ this.NewMessage.Message);
    this.api.addMessage(this.NewMessage).subscribe(e => {
      if (e.Success) {
        //this.auth.readAddress(e.Entities);
        this.isLoaded = false;
        this.isLoading = false;
        this.uploadedFiles = [];
        this.NewMessage.Message = '';
        this.NewMessage.Attachment = '';
        this.NewMessage.Attachment2 = '';
        this.NewMessage.Attachment3 = '';
        this.NewMessage.Attachment4 = '';
        this.NewMessage.Attachment5 = '';
        this.getCaseMessages();
      }
      else {
        console.error(e.Message);
        alert(e.Message);
      }
    }, error => {
      console.debug(error);
      alert('failed: ' + error.message);
    });
  }

  @ViewChild('selectfile') el: ElementRef;   //in html we make variable of selectfile
  progress = { loaded: 0, total: 0 };

  getLoadedImg(msg: ECaseInbox): string {
    return this.api.getUrl('DataApi', 'GetAttachment') + '?q=msg&id=' + msg.ID;
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

    this.NewMessage.Attachment = items.length > 0 ? items[0].path : '';
    this.NewMessage.Attachment2 = items.length > 1 ? items[1].path : '';
    this.NewMessage.Attachment3 = items.length > 2 ? items[2].path : '';
    this.NewMessage.Attachment4 = items.length > 3 ? items[3].path : '';
    this.NewMessage.Attachment5 = items.length > 4 ? items[4].path : '';
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
    this.NewMessage.Attachment = items.length > 0 ? items[0].path : '';
    this.NewMessage.Attachment2 = items.length > 1 ? items[1].path : '';
    this.NewMessage.Attachment3 = items.length > 2 ? items[2].path : '';
    this.NewMessage.Attachment4 = items.length > 3 ? items[3].path : '';
    this.NewMessage.Attachment5 = items.length > 4 ? items[4].path : '';
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

  uploadFile() {
    let count = this.el.nativeElement.files.length;
    if (count == 0) {
      return;
    }

    let i = 0;
    while ( i<count && i<5 && (this.uploadedFiles.length + i) < 5) {
      this.currentFiles.push(this.el.nativeElement.files[i]);
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
