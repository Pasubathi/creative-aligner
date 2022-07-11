import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ERevisions, EPrices, ECountrys } from 'src/app/models/data';
import { AdminApiService } from 'src/app/providers/admin-api.service';
import { LoginApiService } from 'src/app/providers/login-api.service';

@Component({
  selector: 'app-revision-edit',
  templateUrl: './revision-edit.component.html',
  styleUrls: ['./revision-edit.component.scss']
})
export class RevisionEditComponent implements OnInit {

  public Current: ERevisions;
  public errorMessage: string = "";

  constructor(public auth: LoginApiService,
    private adminApi: AdminApiService,
    private modalService: NgbModal) { }

  @Output()
  public RevisionChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('lgModal')
  lgModal: TemplateRef<any>;

  public isSaving: boolean = false;
  public isDeleting: boolean = false;

  ngOnInit(): void {
  }

  public showDlg(item: ERevisions): void {
    this.Current = new ERevisions();
    this.Current.load(item);
    this.errorMessage = "";
    this.modalService.open(this.lgModal, { size: 'lg', centered: true }).result.then((result) => {
    }).catch((res) => { });
  }

  editRevision(modal: any) {
    this.isSaving = true;
    this.adminApi.editRevisionName(this.Current).subscribe(e => {
      if (e.Success) {
        //this.auth.readAddress(e.Entities);
        this.RevisionChanged.emit(modal);
      }
      else {
        this.isSaving = false;
        this.errorMessage = e.Message;
      }
    }, error => {
      console.debug(error);
      this.isSaving = false;
      this.errorMessage = 'failed: ' + error.message;
    });
  }

  public closeDlg(model: any) {
    this.isSaving = false;
    this.isDeleting = false;
    this.Current = new ERevisions();
    this.modalService.dismissAll();
  }

  deleteRevision(modal: any) {
    this.isDeleting = true;
    this.adminApi.removeRevision(this.Current).subscribe(e => {
      if (e.Success) {
        this.RevisionChanged.emit(modal);
      }
      else {
        this.isDeleting = false;
        this.errorMessage = e.Message;
      }
    }, error => {
      console.debug(error);
      this.isDeleting = false;
      this.errorMessage = 'failed: ' + error.message;
    });  
  }

}
