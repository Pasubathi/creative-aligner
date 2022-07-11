import { ECases, EShippingAddresses, ECaseTeeth, ECaseHistory, EUsers, EPrices, ERevisions, ERevisionTeeth, ECaseShipment, ECaseInbox } from "./data";

export class CaseData {
  public Data: ECases = new ECases();
  public UpperItems: ECaseTeeth[] = [];
  public LowerItems: ECaseTeeth[] = [];
  public HistoryRecords: ECaseHistory[] = [];
  public Revisions: RevisionVO[] = [];
  public HasBothLabel: boolean = false;
  public Address: EShippingAddresses = new EShippingAddresses();
  public CaseTreatmentShipments: ECaseShipment[] = [];
  public CaseImpressionsShipments: ECaseShipment[] = [];

  public Country: string = '';
  public Package: EPrices = new EPrices();


  public PackageName(): string {
    if (!this.Package) {
      return '';
    }
    if (this.Package.Package == 'ExpressSingle')
      return 'Express Single Arch'
    if (this.Package.Package == 'ExpressDual')
      return 'Express Dual Arch'
    if (this.Package.Package == 'LiteSingle')
      return 'Lite Single Arch'
    if (this.Package.Package == 'LiteDual')
      return 'Lite Dual Arch'
    return this.Package.Package;
  }
}

export class PendingMessages {
  public ID: string = "";
  public CaseStage: string = "";
  public CaseNumber: string = "";
  public Patient: string = "";
  public Doctor: string = "";
  public Message: string = "";
}

export class AddressData {
  public address: EShippingAddresses = new EShippingAddresses();
  public get ID(): string {
    if (this.address) {
      return this.address.ID;
    }
    return '';
  }
  public get display(): string {
    if (this.address) {
      return this.address.ClinicName + ' - ' + this.address.City;
    }
    return '...';
  }
}

export class DashboardCases {
  public Case: ECases = new ECases();

  public Doctor: string = "";
  public DoctorNo: string = "";
  public Country: string = "";
  public RevisionNumber: number;
  public Package: string = "";

  public PackageName(): string {
    if (!this.Package) {
      return '';
    }
    if (this.Package == 'ExpressSingle')
      return 'Express Single Arch'
    if (this.Package == 'ExpressDual')
      return 'Express Dual Arch'
    if (this.Package == 'LiteSingle')
      return 'Lite Single Arch'
    if (this.Package == 'LiteDual')
      return 'Lite Dual Arch'
    return this.Package;
  }


  public loadData(a: any) {
    this.Case.load(a);
    this.Doctor = a.Doctor;
    this.DoctorNo = a.DoctorNo;
    this.Country = a.Country;
    this.RevisionNumber = a.RevisionNumber;
    this.Package = a.Package;
  }

  public get Name(): string {
    return this.Case.FirstName + ' ' + this.Case.LastName;
  }

  public get StageDate(): Date {
    return this.Case.StageDate;
  }

  public get CaseNumber(): string {
    return this.Case.CaseNumber;
  }

  public get CaseStage(): string {
    return this.Case.getCaseStage;
  }
}

export class CasesSearchResults {
  public Cases: DashboardCases[] = [];
  public TotalCount: number = 0;
  public Page: number = 0;
}

export class CaseSearch {
  public Page: number = 0;
  public States: string = '1';
  public SearchText: string = '';
  public UserID: string = '';

  public SortDir: string = 'asc';
  public SortProp: string = '';
}

export class AdminCaseSearch {
  public Page: number = 0;
  public States: string = '';
  public SearchText: string = '';
  public CountryID: string = '00000000-0000-0000-0000-000000000000';

  public SortDir: string = 'desc';
  public SortProp: string = '';

  public UserID: string = '';
  public MedicalRepID: string = '';
  public OnlyUsers: boolean = false;
  public RoleID: string = '';

  public InitRequest: boolean = false;
}

export class ChangePasswordModel {
  public Email: string = '';
  public OldPassword: string = '';
  public NewPassword: string = '';
  public ConfirmPassword: string = '';
}

export class RegisterUser {
  public Password: string = '';
  public ConfirmPassword: string = '';
  public Email: string = '';
  public Name: string = '';
  public LastName: string = '';
  public CountryID: string = '';
  public City: string = '';
  public Speciality: string = '';
  public Telephone: string = '';

  public toUser(): EUsers {
    let result = new EUsers();
    result.City = this.City;
    result.Password = this.Password;
    result.Email = this.Email;
    result.Name = this.Name;
    result.LastName = this.LastName;
    result.CountryID = this.CountryID;
    result.Speciality = this.Speciality;
    result.Telephone = this.Telephone;
    return result;
  }
}

export class AdminCaseSearchResults {
  public Cases: DashboardCases[] = [];
  public TotalCount: number = 0;
  public Page: number = 0;
}

export class BindingDataItem {
  public ID: string = '';
  public Name: string = ''
}

export class DashboardPackages {
  public package: EPrices = new EPrices();
  public Country: string = "";

  public loadData(a: any) {
    this.package.load(a);
    this.Country = a.Country;
  }

  public get Package(): string {
    return this.package.Package;
  }
  public get PackagePrice(): number {
    return this.package.PackagePrice;
  }
  public get CountryID(): String {
    return this.package.CountryID;
  }
}

export class DashboardUser {
  public User: EUsers = new EUsers();
  public Country: string = "";
  public RoleName: string = "";

  public loadData(a: any) {
    this.User.load(a);
    this.Country = a.Country;
    this.RoleName = a.RoleName;
  }

  public get ID(): string {
    return this.User.ID;
  }
  public get Name(): string {
    return this.User.Name;
  }

  public get LastName(): string {
    return this.User.LastName;
  }

  public get City(): string {
    return this.User.City;
  }

  public get Email(): string {
    return this.User.Email;
  }

  public get Stamp(): Date {
    return this.User.Stamp;
  }

  public get UserNumber(): number {
    return this.User.Number;
  }

  public get MedicalRepID(): string {
    return this.User.MedicalRepID;
  }

  public get ActiveStatus(): string {
    switch (this.User.IsActive) {
      case true: {
        return 'Active';
      }
      case false: {
        return 'InActive';
      }
    }
    return " ";
  }

  public get FullName(): string {
    return this.User.Name + ' ' + this.User.LastName;
  }
}

export class AdminUsersSearchResults {
  public Users: DashboardUser[] = [];
  public TotalCount: number = 0;
  public Page: number = 0;
}

export class RequestRevision {
  public CaseID: string = '';
  public RevisionID: string = '';
  public NotationSystem: string = '';
}

export class RevisionData {
  public Revision: ERevisions = new ERevisions();
  public HasBothLabel: boolean = false;
  public IsActive: boolean = false;

  public Packages: EPrices[] = [];

  public UpperIprAmount: ERevisionTeeth[] = [];
  public UpperIprStep: ERevisionTeeth[] = [];

  public LowerIprAmount: ERevisionTeeth[] = [];
  public LowerIprStep: ERevisionTeeth[] = [];


  public UStripMesial: ERevisionTeeth[] = [];
  public LStripMesial: ERevisionTeeth[] = [];

  public UStripDistal: ERevisionTeeth[] = [];
  public LStripDistal: ERevisionTeeth[] = [];

  public UInclination: ERevisionTeeth[] = [];
  public LInclination: ERevisionTeeth[] = [];

  public UInclinationStep: ERevisionTeeth[] = [];
  public LInclinationStep: ERevisionTeeth[] = [];

  public UAngulation: ERevisionTeeth[] = [];
  public LAngulation: ERevisionTeeth[] = [];

  public UAngulationStep: ERevisionTeeth[] = [];
  public LAngulationStep: ERevisionTeeth[] = [];

  public URotationStep: ERevisionTeeth[] = [];
  public LRotationStep: ERevisionTeeth[] = [];

  public UMesialStep: ERevisionTeeth[] = [];
  public LMesialStep: ERevisionTeeth[] = [];

  public UVestibularStep: ERevisionTeeth[] = [];
  public LVestibularStep: ERevisionTeeth[] = [];

  public UOcclusalStep: ERevisionTeeth[] = [];
  public LOcclusalStep: ERevisionTeeth[] = [];

  public get HasData(): boolean {
    return this.UpperIprAmount && this.UpperIprAmount.length > 0;
  }

  public HasIpr(upper: boolean, index: number): boolean {
    let result: boolean = upper ? this.UpperIprAmount[index].RowValue > 0 || this.UpperIprStep[index].RowValue > 0 :
      this.LowerIprAmount[index].RowValue > 0 || this.LowerIprStep[index].RowValue > 0;
      return result ;
  }

  public getIpr(upper: boolean, kind: number, index: number): number {
    return upper ?
      (kind == 0 ? this.UpperIprAmount[index].RowValue : this.UpperIprStep[index].RowValue) :
      (kind == 0 ? this.LowerIprAmount[index].RowValue : this.LowerIprStep[index].RowValue);
  }

  public parse(data: any) {
    this.Revision.load(data.Revision);
    this.HasBothLabel = data.HasBothLabel;
    this.IsActive = data.IsActive;
    if (data.Packages && data.Packages.length > 0) {
      let packages: EPrices[] = [];
      data.Packages.forEach(function (data: any) {
        var item = new EPrices();
        item.load(data);
        packages.push(item);
      });
      this.Packages = packages;
    }

    this.UpperIprAmount = this.getTeethRevision(data.UpperIprAmount);
    this.UpperIprStep = this.getTeethRevision(data.UpperIprStep);
    this.LowerIprAmount = this.getTeethRevision(data.LowerIprAmount);
    this.LowerIprStep = this.getTeethRevision(data.LowerIprStep);
    this.UStripMesial = this.getTeethRevision(data.UStripMesial);
    this.LStripMesial = this.getTeethRevision(data.LStripMesial);
    this.UStripDistal = this.getTeethRevision(data.UStripDistal);
    this.LStripDistal = this.getTeethRevision(data.LStripDistal);
    this.UInclination = this.getTeethRevision(data.UInclination);
    this.LInclination = this.getTeethRevision(data.LInclination);
    this.UInclinationStep = this.getTeethRevision(data.UInclinationStep);
    this.LInclinationStep = this.getTeethRevision(data.LInclinationStep);
    this.UAngulation = this.getTeethRevision(data.UAngulation);
    this.LAngulation = this.getTeethRevision(data.LAngulation);
    this.UAngulationStep = this.getTeethRevision(data.UAngulationStep);
    this.LAngulationStep = this.getTeethRevision(data.LAngulationStep);
    this.URotationStep = this.getTeethRevision(data.URotationStep);
    this.LRotationStep = this.getTeethRevision(data.LRotationStep);
    this.UMesialStep = this.getTeethRevision(data.UMesialStep);
    this.LMesialStep = this.getTeethRevision(data.LMesialStep);
    this.UVestibularStep = this.getTeethRevision(data.UVestibularStep);
    this.LVestibularStep = this.getTeethRevision(data.LVestibularStep);
    this.UOcclusalStep = this.getTeethRevision(data.UOcclusalStep);
    this.LOcclusalStep = this.getTeethRevision(data.LOcclusalStep);
  }

  public getTeethRevision(data: any): ERevisionTeeth[] {
    let items: ERevisionTeeth[] = [];
    if (data && data.length > 0) {
      data.forEach(function (data: any) {
        var item = new ERevisionTeeth();
        item.load(data);
        items.push(item);
      });
    }
    return items;
  }
}

export class RequestPageContent {
  public ContentKey: string = "";
}

export class PostPageContent {
  public ContentKey: string = "";
  public ContentData: string = "";
}

export class ResetPassword {
  public ID: string = "";
  public Password: string = "";
}

export class EmailSettings {
  public Email: string = '';
  public Password: string = '';
  public Smtp: string = '';
  public Port: number = 23;
  public UseSsl: boolean = false;
}

export class RemoveAttachment {
  public Attachment: string = '';
}

export class FileAttachment {
  public file: string = '';
  public path: string = '';
}

export class PostRevision
{
  public Revision: ERevisions = new ERevisions();
  public Message: ECaseInbox = new ECaseInbox();
  public Notes: string = '';
  public Status: string = '';
}

export class PostCases
{
  public Message: ECaseInbox = new ECaseInbox();
  public Notes: string = '';
  public Status: string = '';
  public CurrentStatus: string = '';
  public CaseID: string = '00000000-0000-0000-0000-000000000000';
}

export class RevisionVO extends ERevisions{
  public Package: string = '';
  public PackagePrice: number = 0;

  public PackageName(): string {
    if (!this.Package) {
      return '';
    }
    if (this.Package == 'ExpressSingle')
      return 'Express Single Arch'
    if (this.Package == 'ExpressDual')
      return 'Express Dual Arch'
    if (this.Package == 'LiteSingle')
      return 'Lite Single Arch'
    if (this.Package == 'LiteDual')
      return 'Lite Dual Arch'
    return this.Package;
  }

  public loadData(a: any) {
    super.load(a);
    this.Package = a.Package;
    this.PackagePrice = a.PackagePrice;
  }
}

export class BindingList
{
  public value: string = '';
  public name: string = '';
}
