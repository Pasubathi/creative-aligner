import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ECountrys, EPrices } from 'src/app/models/data';
import { AdminCaseSearch, DashboardPackages } from 'src/app/models/entities';
import { AdminApiService } from 'src/app/providers/admin-api.service';
import { LoginApiService } from 'src/app/providers/login-api.service';
import { PackageModalComponent } from 'src/app/shared/controls/package-modal/package-modal.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  public loadingIndicator: boolean = false;
  public packageList: DashboardPackages[] = [];
  public SearchModel: AdminCaseSearch = new AdminCaseSearch();
  public countries: ECountrys[] = [];
  
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  public isNew: boolean = false;
  public Current: EPrices = new EPrices();

  constructor(public api: AdminApiService,
    public auth: LoginApiService,) { }

  ngOnInit(): void {

    let countries: ECountrys[] = [];
    countries.push(this.getEmptyCountry());
    this.auth.countries.forEach(function (a: ECountrys) {
      countries.push(a);
    });
    this.countries = countries;
    this.doSearchPackages();
  }

  getEmptyCountry(): ECountrys {
    let item = new ECountrys();
    item.ID = '00000000-0000-0000-0000-000000000000';
    item.Country = 'All';
    return item;
  }

  @ViewChild('packageCtr')
  packageCtr: PackageModalComponent;

  doSearch() {
    //console.debug('------------------');
    // this.TotalCount = 0;
    // this.pageNumber = 0;
    this.SearchModel.Page = 0;
    this.doSearchPackages();
  }

  doSearchPackages() {
    //console.debug(this.SearchModel);

    this.loadingIndicator = true;
    this.packageList = [];
    //this.SearchModel.Page = this.pageNumber;
    if (this.SearchModel.CountryID == null){
      this.SearchModel.CountryID = this.getEmptyCountry().ID;
    }
    this.api.getPackages(this.SearchModel).subscribe(result => {
      console.debug("result: "+result);
      this.loadingIndicator = false;
      if (result && result.length > 0) {
        this.packageList = result;
        console.debug(" this.packageList: "+  this.packageList);
        //this.TotalCount = result.TotalCount;
        //this.pageNumber - result.Page;
      }
    }, error => {
      this.loadingIndicator = false;
      console.debug(error);
      if (error.message) {
        alert(error.message);
      } else {
        alert('Failed');
      }
    });
  }

  editPackage(data: DashboardPackages) {
    //console.debug('Event: selected ',event.selected[0]);
    this.isNew = false;
    this.Current = data.package;
    this.packageCtr.showDlg();
  }
  newPackage() {
    this.isNew = true;
    this.Current = new EPrices();
    this.packageCtr.showDlg();
  }
  onPackageChanged(pricePackage: any) {
    this.doSearch();
  }

}
