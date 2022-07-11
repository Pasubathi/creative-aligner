import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardUser } from 'src/app/models/entities';
import { AdminApiService } from 'src/app/providers/admin-api.service';
import { EPermissionGroups, EUsers } from '../../../models/data';

@Component({
  selector: 'app-doctor-modal',
  templateUrl: './doctor-modal.component.html',
  styleUrls: ['./doctor-modal.component.scss']
})
export class DoctorModalComponent implements OnInit {

  public activeStatuses: any[] = [{ value: true, name: 'Active' }, { value: false, name: 'In Active' }];
  public medicalReps: DashboardUser[] = [];
  public errorMessage: string = '';

  constructor(private adminApi: AdminApiService,
    private modalService: NgbModal) { }

  @Input()
  public Current: DashboardUser = new DashboardUser();

  

  @Output()
  public UserChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('lgModal')
  lgModal: TemplateRef<any>;

  public savingUser: boolean = false;
  public removingUser: boolean = false;
  public loading: boolean = false;

  ngOnInit(): void {

  }

  public showDlg(): void {
    this.medicalReps = this.adminApi.MedRepUsers;
    this.removingUser=false;
    this.savingUser=false;
    this.errorMessage = '';
    console.debug(this.Current);
    this.modalService.open(this.lgModal, { size: 'lg', centered: true }).result.then((result) => {
    }).catch((res) => { });
  }

  edit_User(modal: any) {
    this.savingUser = true;
    //console.debug(this.Current.User);
    this.adminApi.editUser(this.Current.User).subscribe(e => {
      this.savingUser = false;
      if (e.Success) {
        this.UserChanged.emit();
        modal.close();
        this.Current = new DashboardUser();
      }
      else {
        this.savingUser = false;
        this.errorMessage = e.Message;
      }
    }, error => {
      console.debug(error);
      this.savingUser = false;
      this.errorMessage = 'failed: ' + error.message;
    });
  }

  removeUser(modal: any) {
    this.removingUser = true;
    //console.debug(this.Current.User);
    this.adminApi.deleteUser(this.Current.User).subscribe(e => {
      this.removingUser = false;
      if (e.Success) {
        this.UserChanged.emit();
        modal.close();
        this.Current = new DashboardUser();
      }
      else {
        this.removingUser = false;
        this.errorMessage = e.Message
      }
    }, error => {
      console.debug(error);
      this.removingUser = false;
      this.errorMessage = 'failed: ' + error.message;
    });
}

}
