import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DashboardUser } from 'src/app/models/entities';
import { AdminApiService } from 'src/app/providers/admin-api.service';
import { LoginApiService } from 'src/app/providers/login-api.service';
import { ECountrys, EPermissionGroups, EUsers } from '../../../models/data';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  public activeStatuses: any[] = [{ value: true, name: 'Active' }, { value: false, name: 'In Active' }];
  public currentRoles: EPermissionGroups[] = [];
  public formSubmited: boolean = false;
  public IsNew: boolean = false;
  public errorMessage: string = '';
  public countries: ECountrys[] = [];
  public savingUser: boolean = false;
  public removingUser: boolean = false;

  constructor(private adminApi: AdminApiService,
    private api: LoginApiService,
    private modalService: NgbModal) { }

  @Input()
  public Current: DashboardUser = new DashboardUser();

  @Output()
  public UserChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('lgModal')
  lgModal: TemplateRef<any>;

  // @ViewChild('userForm')
  // userForm: FormGroup;


  ngOnInit(): void {
    this.countries = this.api.countries;
    //this.savingUser = true;
    //this.adminApi.getRoles().subscribe(a => {
    //  //console.debug(a);
    //  this.savingUser = false;
    //  let result: EPermissionGroups[] = [];
    //  //result.push(this.getEmptyItem());
    //  a.forEach(function (data: EPermissionGroups) {
    //    result.push(data);
    //  });
    //  this.currentRoles = result;
    //}, error => {
    //  console.debug(error);
    //  this.savingUser = false;
    //  let result: EPermissionGroups[] = [];
    //  //result.push(this.getEmptyItem());
    //  this.currentRoles = result;
    //});

    // get medical representatives list
    //this.savingUser = true;
    //this.adminApi.getMedicalReps().subscribe(a => {
    //  this.savingUser = false;
    //  let result: DashboardUser[] = [];
    //  a.forEach(function (data: DashboardUser) {
    //    result.push(data);
    //  });
    //  this.medicalReps = result;
    //}, error => {
    //  console.debug(error);
    //  this.savingUser = false;
    //  let result: DashboardUser[] = [];
    //  this.medicalReps = result;
    //});
  }

  public showDlg(): void {
    this.errorMessage = '';
    this.formSubmited = false;
    this.currentRoles = this.adminApi.UserGroups;
    this.savingUser=false;
    this.removingUser = false;
    console.debug(this.Current);
    this.modalService.open(this.lgModal, { size: 'lg', centered: true }).result.then((result) => {
    }).catch((res) => { });
  }

  //getEmptyItem(): EPermissionGroups {
  //  let item = new EPermissionGroups();
  //  item.ID = '00000000-0000-0000-0000-000000000000';
  //  item.Name = '----';
  //  return item;
  //}

  save_User(modal: any, userForm: any){
    if (this.IsNew) {
      this.add_User(modal, userForm);
    }
    else {
      this.edit_User(modal, userForm);
    }
  }

  edit_User(modal: any, userForm: any) {
    this.formSubmited = true;
    if (userForm.valid) {
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
          this.errorMessage = e.Message
        }
      }, error => {
        console.debug(error);
        this.savingUser = false;
        this.errorMessage = 'failed: ' + error.message;
      });
    }
    else {
      console.debug(userForm.errors);
    }
  }

  add_User(modal: any, userForm: any) {
    this.formSubmited = true;
    if (userForm.valid) {
      this.savingUser = true;
      //console.debug(this.Current.User);
      this.adminApi.addUser(this.Current.User).subscribe(e => {
        this.savingUser = false;
        if (e.Success) {
          this.UserChanged.emit();
          modal.close();
          this.Current = new DashboardUser();
        }
        else {
          this.savingUser = false;
          this.errorMessage = e.Message
        }
      }, error => {
        console.debug(error);
        this.savingUser = false;
        this.errorMessage = 'failed: ' + error.message;
      });
    }
    else {
      console.debug(userForm.errors);
    }
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
