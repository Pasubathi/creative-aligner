import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EShippingAddresses } from '../../../models/data';
import { LoginApiService } from '../../../providers/login-api.service';

import { ChangePasswordModel } from '../../../models/entities';
import { AdminApiService } from 'src/app/providers/admin-api.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {

  public Current: ChangePasswordModel = new ChangePasswordModel();

  constructor(public auth: LoginApiService,
    public admin: AdminApiService,
    private modalService: NgbModal) { }

  @ViewChild('lgModal')
  lgModal: TemplateRef<any>;

  public postingPassword: boolean = false;
  public errorMessage: string = '';
  public isError: boolean = false;

  ngOnInit(): void {
  }

  public showDlg(): void {
    this.modalService.open(this.lgModal, { size: 'lg', centered: true }).result.then((result) => {
    }).catch((res) => { });
  }

  changePassword(modal: any) {
    this.postingPassword = true;
    this.Current.Email = this.auth.user.Email;
    this.isError = false;
    this.admin.changePassword(this.Current).subscribe(e => {
      this.postingPassword = false;
      if (e.Success) {
        modal.close();
      }
      else {
        this.postingPassword = false;
        this.isError = true;
        this.errorMessage = e.Message;
      }
    }, error => {
      this.postingPassword = false;
      this.isError = true;
      this.errorMessage = 'Connection to the server is not available';
    });
  }
}
