import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseServiceService } from 'src/app/providers/case-service.service';
import { LoginApiService } from 'src/app/providers/login-api.service';

@Component({
  selector: 'app-case-invoice',
  templateUrl: './case-invoice.component.html',
  styleUrls: ['./case-invoice.component.scss']
})
export class CaseInvoiceComponent implements OnInit {

  public isLoading: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
    public api: CaseServiceService,
    public auth: LoginApiService) { }

  ngOnInit(): void {
    let id: string = '';
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        id = params['id'];
      }
    });
    if (id.length > 0) {
      console.debug('loading ' + id);
      this.api.getCase(id).subscribe(a => {
        if (a.Success) {
          this.api.readCase(a, this.auth.user.NotationSystem);
          console.debug(this.api.case);
          this.isLoading = false;
        }
        else {
          alert('No data: ' + a.Message);
        }
      }, error => {
        alert('loading failed');
      });
    }
  }

}
