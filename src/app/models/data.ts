export type EnumCaseStages = '' | 'Incomplete' | 'PendingCaseApproval' | 'Accepted' | 'Returned' | 'ReadyForImpressionsCollection' | 'ImpressionsShipped' | 'ImpressionsReceived' | 'PendingOrthodontistApproval' | 'AmendRevision' | 'PendingTSApproval' | 'RequestNewRevision' | 'Approved' | 'Manufacturing' | 'ReadyForShipping' | 'Active' | 'RequestNextShipment' | 'ReplaceMissing' | 'RequestRefinments' | 'RequestMidcourseAdjusment' | 'RequestRetainer' | 'Archived';
export type EnumGender = '' | 'Male' | 'Female';
export type EnumImpressionType = '' | 'Digital' | 'Physical';
export type EnumVerticalPos = '' | 'Upper' | 'Lower' | 'Both';
export type EnumHorizontalPos = '' | 'Centered' | 'ShiftedRight' | 'ShipftedLeft';
export type EnumProfile = '' | 'Straight' | 'Concave' | 'Convex';
export type EnumHeightSize = '' | 'High' | 'Average' | 'Low';
export type EnumImprovement = '' | 'Maintain' | 'Improve' | 'Idealize';
export type EnumYesNo = '' | 'Yes' | 'No' | 'IfNeeded';
export type EnumPackage = '' | 'ExpressSingle' | 'ExpressDual' | 'LiteSingle' | 'LiteDual' | 'Unlimited';
export type EnumNotationSystem = '' | 'Universal' | 'Palmer' | 'FDI';
export type EnumShipmnetType = '' | 'Treatment' | 'Impressions';



export class EUsers {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public PermissionGroupID: string = '00000000-0000-0000-0000-000000000000';
  public Password: string = '';
  public Email: string = '';
  public Name: string = '';
  public LastName: string = '';
  public CountryID: string = '00000000-0000-0000-0000-000000000000';
  public City: string = '';
  public Speciality: string = '';
  public Telephone: string = '';
  public Stamp: Date = new Date();
  public IsActive: boolean = false;
  public IsConfirmed: boolean = false;
  public NotationSystem: string = 'Palmer';
  public Number: number = 0;
  public Role: string = '';
  public MedicalRepID: string = '00000000-0000-0000-0000-000000000000';

  public load(data_value: any): EUsers {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.PermissionGroupID) { this.PermissionGroupID = data_value.PermissionGroupID; }
    if (data_value.Password) { this.Password = data_value.Password; }
    if (data_value.Email) { this.Email = data_value.Email; }
    if (data_value.Name) { this.Name = data_value.Name; }
    if (data_value.LastName) { this.LastName = data_value.LastName; }
    if (data_value.CountryID) { this.CountryID = data_value.CountryID; }
    if (data_value.City) { this.City = data_value.City; }
    if (data_value.Speciality) { this.Speciality = data_value.Speciality; }
    if (data_value.Telephone) { this.Telephone = data_value.Telephone; }
    if (data_value.Stamp) { this.Stamp = data_value.Stamp; }
    if (data_value.IsActive) { this.IsActive = data_value.IsActive; }
    if (data_value.IsConfirmed) { this.IsConfirmed = data_value.IsConfirmed; }
    if (data_value.NotationSystem) { this.NotationSystem = data_value.NotationSystem; }
    if (data_value.Number) { this.Number = data_value.Number; }
    if (data_value.Role) { this.Role = data_value.Role; }
    if (data_value.MedicalRepID) { this.MedicalRepID = data_value.MedicalRepID; }
    return this;
  }
}
export class EPermissionGroups {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public Name: string = '';

  public load(data_value: any): EPermissionGroups {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.Name) { this.Name = data_value.Name; }
    return this;
  }
}
export class EUserPermissions {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public GroupID: string = '00000000-0000-0000-0000-000000000000';
  public Name: string = '';
  public HasAccess: boolean = false;

  public load(data_value: any): EUserPermissions {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.GroupID) { this.GroupID = data_value.GroupID; }
    if (data_value.Name) { this.Name = data_value.Name; }
    if (data_value.HasAccess) { this.HasAccess = data_value.HasAccess; }
    return this;
  }
}
export class EUserSessions {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public UserID: string = '00000000-0000-0000-0000-000000000000';
  public CreatedDate: Date = new Date();
  public UserToken: string = '';

  public load(data_value: any): EUserSessions {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.UserID) { this.UserID = data_value.UserID; }
    if (data_value.CreatedDate) { this.CreatedDate = data_value.CreatedDate; }
    if (data_value.UserToken) { this.UserToken = data_value.UserToken; }
    return this;
  }
}
export class ETerms {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public Terms: string = '';
  public Version: string = '';
  public VersionDate: Date = new Date();

  public load(data_value: any): ETerms {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.Terms) { this.Terms = data_value.Terms; }
    if (data_value.Version) { this.Version = data_value.Version; }
    if (data_value.VersionDate) { this.VersionDate = data_value.VersionDate; }
    return this;
  }
}
export class ECountrys {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public Code: string = '';
  public Country: string = '';
  public Number: number = 0;

  public load(data_value: any): ECountrys {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.Code) { this.Code = data_value.Code; }
    if (data_value.Country) { this.Country = data_value.Country; }
    if (data_value.Number) { this.Number = data_value.Number; }
    return this;
  }
}
export class EShippingAddresses {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public UserID: string = '00000000-0000-0000-0000-000000000000';
  public CountryID: string;
  public State: string = '';
  public City: string = '';
  public Street: string = '';
  public Building: string = '';
  public ZipCode: string = '';
  public Phone: string = '';
  public UnitNo: string = '';
  public District: string = '';
  public ExtraNo: string = '';
  public ClinicName: string = '';

  public load(data_value: any): EShippingAddresses {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.UserID) { this.UserID = data_value.UserID; }
    if (data_value.CountryID) { this.CountryID = data_value.CountryID; }
    if (data_value.State) { this.State = data_value.State; }
    if (data_value.City) { this.City = data_value.City; }
    if (data_value.Street) { this.Street = data_value.Street; }
    if (data_value.Building) { this.Building = data_value.Building; }
    if (data_value.ZipCode) { this.ZipCode = data_value.ZipCode; }
    if (data_value.Phone) { this.Phone = data_value.Phone; }
    if (data_value.UnitNo) { this.UnitNo = data_value.UnitNo; }
    if (data_value.District) { this.District = data_value.District; }
    if (data_value.ExtraNo) { this.ExtraNo = data_value.ExtraNo; }
    if (data_value.ClinicName) { this.ClinicName = data_value.ClinicName; }
    return this;
  }
}
export class ERevisions {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public CaseID: string = '00000000-0000-0000-0000-000000000000';
  public RevisionNumber: number = 0;
  public DesignEmbededURL: string = '';
  public PackageID: string = '00000000-0000-0000-0000-000000000000';
  public DesignerNotes: string = '';
  public RevisionDocument: string = '';
  public DoctorNotes: string = '';
  public OrthodontistNotes: string = '';
  public RevisionName: string = '';
  public IsApproved: boolean = false;

  public get RevisionTitle(): string {
    if (this.RevisionName && this.RevisionName.length > 0) {
      return this.RevisionName;
    }
    return "Revision " + this.RevisionNumber;
  }

  public get RevisionID(): string {
    return "ID" + this.RevisionNumber;
  }

  public load(data_value: any): ERevisions {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.CaseID) { this.CaseID = data_value.CaseID; }
    if (data_value.RevisionNumber) { this.RevisionNumber = data_value.RevisionNumber; }
    if (data_value.DesignEmbededURL) { this.DesignEmbededURL = data_value.DesignEmbededURL; }
    if (data_value.PackageID) { this.PackageID = data_value.PackageID; }
    if (data_value.DesignerNotes) { this.DesignerNotes = data_value.DesignerNotes; }
    if (data_value.RevisionDocument) { this.RevisionDocument = data_value.RevisionDocument; }
    if (data_value.DoctorNotes) { this.DoctorNotes = data_value.DoctorNotes; }
    if (data_value.OrthodontistNotes) { this.OrthodontistNotes = data_value.OrthodontistNotes; }
    if (data_value.RevisionName) { this.RevisionName = data_value.RevisionName; }
    if (data_value.IsApproved) { this.IsApproved = data_value.IsApproved; }
    return this;
  }
}
export class ECaseHistory {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public CaseID: string = '00000000-0000-0000-0000-000000000000';
  public Stage: string = '';
  public ChangeDate: Date = new Date();

  public load(data_value: any): ECaseHistory {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.CaseID) { this.CaseID = data_value.CaseID; }
    if (data_value.Stage) { this.Stage = data_value.Stage; }
    if (data_value.ChangeDate) { this.ChangeDate = data_value.ChangeDate; }
    return this;
  }
}
export class ECaseInbox {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public CaseID: string = '00000000-0000-0000-0000-000000000000';
  public RevisionID: string = '00000000-0000-0000-0000-000000000000';
  public UserID: string = '00000000-0000-0000-0000-000000000000';
  public MessageDate: Date = new Date();
  public ReadStatus: boolean = false;
  public Message: string = '';
  public Attachment: string = '';
  public Attachment2: string = '';
  public Attachment3: string = '';
  public Attachment4: string = '';
  public Attachment5: string = '';

  public load(data_value: any): ECaseInbox {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.CaseID) { this.CaseID = data_value.CaseID; }
    if (data_value.UserID) { this.UserID = data_value.UserID; }
    if (data_value.RevisionID) { this.RevisionID = data_value.RevisionID; }
    if (data_value.MessageDate) { this.MessageDate = data_value.MessageDate; }
    if (data_value.ReadStatus) { this.ReadStatus = data_value.ReadStatus; }
    if (data_value.Message) { this.Message = data_value.Message; }
    if (data_value.Attachment) { this.Attachment = data_value.Attachment; }
    if (data_value.Attachment2) { this.Attachment = data_value.Attachment2; }
    if (data_value.Attachment3) { this.Attachment = data_value.Attachment3; }
    if (data_value.Attachment4) { this.Attachment = data_value.Attachment4; }
    if (data_value.Attachment5) { this.Attachment = data_value.Attachment5; }
    return this;
  }
}
export class ENotationSystems {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public Universal: string = '';
  public Palmer: string = '';
  public Fdi: string = '';

  public load(data_value: any): ENotationSystems {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.Universal) { this.Universal = data_value.Universal; }
    if (data_value.Palmer) { this.Palmer = data_value.Palmer; }
    if (data_value.Fdi) { this.Fdi = data_value.Fdi; }
    return this;
  }
}
export class ECases {
  public ID: string;
  public CaseStage: EnumCaseStages = 'Incomplete';
  public StageDate: Date = new Date();
  public FirstName: string = '';
  public LastName: string = '';
  public Gender: EnumGender = 'Male';
  public DateOfBirth: Date = new Date();
  public ShippingAddressID: string;
  public ImageFrontSmiling: string = '';
  public ImageFrontNonSmiling: string = '';
  public ImageSide: string = '';
  public ImagePanoramic: string = '';
  public ImageUpper: string = '';
  public ImageFrontal: string = '';
  public ImageLower: string = '';
  public ImageCephalometric: string = '';
  public ImageRight: string = '';
  public ImageLeft: string = '';
  public ImageAdditional1: string = '';
  public ImageAdditional2: string = '';
  public ImpressionType: EnumImpressionType = 'Digital';
  public UpperArchScan: string = '';
  public LowerArchScan: string = '';
  public ChiefComplaint: string = '';
  public TreatArches: EnumVerticalPos = 'Both';
  public IncisorsClassRelationship: string = '';
  public CanineClassRelationshipRight: string = '';
  public CanineClassRelationshipLeft: string = '';
  public MolarClassRelationshipRight: string = '';
  public MolarClassRelationshipLeft: string = '';
  public CondUpperMidline: string = '';
  public CondUpperMidlineShift: number = 0;
  public CondLowerMidline: string = '';
  public CondLowerMidlineShift: number = 0;
  public Profile: EnumProfile = 'Straight';
  public FacialHeight: EnumHeightSize = 'Average';
  public InstUpperMidline: EnumImprovement = 'Improve';
  public InstLowerMidline: EnumImprovement = 'Improve';
  public Overjet: EnumImprovement = 'Improve';
  public Overbite: EnumImprovement = 'Improve';
  public CanineRelationship: EnumImprovement = 'Improve';
  public MolarRelationship: EnumImprovement = 'Improve';
  public PosteriorCrossbite: EnumImprovement = 'Improve';
  public Ipr: EnumYesNo = 'IfNeeded';
  public Attachments: EnumYesNo = 'IfNeeded';
  public Procline: EnumYesNo = 'IfNeeded';
  public Expand: EnumYesNo = 'IfNeeded';
  public Distalize: EnumYesNo = 'IfNeeded';
  public AdditionalInformation: string = '';
  public ImpressionShippingPolicy: string = '';
  public TreatmentShippingPolicy: string = '';
  public CasePrice: string = '';
  public Number: number = 0;
  public CaseDate: Date = new Date();
  public UserID: string;
  public ReturnNotes: string = '';
  public CaseNumber: string = '';
  public PackageID: string;
  //public UserNumber: number = 0;

  public get getCaseStage(): string {
    switch (this.CaseStage) {
      case 'Incomplete': {
        return 'Incomplete Case';
      }
      case 'PendingCaseApproval': {
        return 'Pending Case Approval';
      }
      case 'Accepted': {
        return 'Case Accepted';
      }
      case 'Returned': {
        return 'Returned for Adjusment';
      }
      case 'ReadyForImpressionsCollection': {
        return 'Impressions Collection';
      }
      case 'ImpressionsShipped': {
        return 'Impressions Shipped';
      }
      case 'ImpressionsReceived': {
        return 'Impressions Received';
      }
      case 'PendingOrthodontistApproval': {
        return 'Pending Orthodontist Approval';
      }
      case 'AmendRevision': {
        return 'Request Revision Ammendment';
      }
      case 'PendingTSApproval': {
        return 'Pending TS Approval';
      }
      case 'RequestNewRevision': {
        return 'Request New Revision';
      }
      case 'Approved': {
        return 'Design Approved';
      }
      case 'Active': {
        return 'Active';
      }
      case 'Archived': {
        return 'Archived';
      }
      case 'Manufacturing': {
        return 'Manufacturing';
      }
      case 'ReadyForShipping': {
        return 'Ready For Shipping';
      }
      case 'RequestNextShipment': {
        return 'Request Next Shipment';
      }
      case 'ReplaceMissing': {
        return 'Replace Missing';
      }
      case 'RequestRefinments': {
        return 'Request Refinements';
      }
      case 'RequestRetainer': {
        return 'Request Retainer';
      }
      case 'RequestMidcourseAdjusment': {
        return 'Request Midcourse Adjusment';
      }
      //  | '' | '' | '' | '' | '' | '' | '' | '' | '';
    }
    return "In Process";
  }

  public load(data_value: any): ECases {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.CaseStage) { this.CaseStage = data_value.CaseStage; }
    if (data_value.StageDate) { this.StageDate = data_value.StageDate; }
    if (data_value.FirstName) { this.FirstName = data_value.FirstName; }
    if (data_value.LastName) { this.LastName = data_value.LastName; }
    if (data_value.Gender) { this.Gender = data_value.Gender; }
    if (data_value.DateOfBirth) { this.DateOfBirth = data_value.DateOfBirth; }
    if (data_value.ShippingAddressID) { this.ShippingAddressID = data_value.ShippingAddressID; }
    if (data_value.ImageFrontSmiling) { this.ImageFrontSmiling = data_value.ImageFrontSmiling; }
    if (data_value.ImageFrontNonSmiling) { this.ImageFrontNonSmiling = data_value.ImageFrontNonSmiling; }
    if (data_value.ImageSide) { this.ImageSide = data_value.ImageSide; }
    if (data_value.ImagePanoramic) { this.ImagePanoramic = data_value.ImagePanoramic; }
    if (data_value.ImageUpper) { this.ImageUpper = data_value.ImageUpper; }
    if (data_value.ImageFrontal) { this.ImageFrontal = data_value.ImageFrontal; }
    if (data_value.ImageLower) { this.ImageLower = data_value.ImageLower; }
    if (data_value.ImageCephalometric) { this.ImageCephalometric = data_value.ImageCephalometric; }
    if (data_value.ImageRight) { this.ImageRight = data_value.ImageRight; }
    if (data_value.ImageLeft) { this.ImageLeft = data_value.ImageLeft; }
    if (data_value.ImageAdditional1) { this.ImageAdditional1 = data_value.ImageAdditional1; }
    if (data_value.ImageAdditional2) { this.ImageAdditional2 = data_value.ImageAdditional2; }
    if (data_value.ImpressionType) { this.ImpressionType = data_value.ImpressionType; }
    if (data_value.UpperArchScan) { this.UpperArchScan = data_value.UpperArchScan; }
    if (data_value.LowerArchScan) { this.LowerArchScan = data_value.LowerArchScan; }
    if (data_value.ChiefComplaint) { this.ChiefComplaint = data_value.ChiefComplaint; }
    if (data_value.TreatArches) { this.TreatArches = data_value.TreatArches; }
    if (data_value.IncisorsClassRelationship) { this.IncisorsClassRelationship = data_value.IncisorsClassRelationship; }
    if (data_value.CanineClassRelationshipRight) { this.CanineClassRelationshipRight = data_value.CanineClassRelationshipRight; }
    if (data_value.CanineClassRelationshipLeft) { this.CanineClassRelationshipLeft = data_value.CanineClassRelationshipLeft; }
    if (data_value.MolarClassRelationshipRight) { this.MolarClassRelationshipRight = data_value.MolarClassRelationshipRight; }
    if (data_value.MolarClassRelationshipLeft) { this.MolarClassRelationshipLeft = data_value.MolarClassRelationshipLeft; }
    if (data_value.CondUpperMidline) { this.CondUpperMidline = data_value.CondUpperMidline; }
    if (data_value.CondUpperMidlineShift) { this.CondUpperMidlineShift = data_value.CondUpperMidlineShift; }
    if (data_value.CondLowerMidline) { this.CondLowerMidline = data_value.CondLowerMidline; }
    if (data_value.CondLowerMidlineShift) { this.CondLowerMidlineShift = data_value.CondLowerMidlineShift; }
    if (data_value.Profile) { this.Profile = data_value.Profile; }
    if (data_value.FacialHeight) { this.FacialHeight = data_value.FacialHeight; }
    if (data_value.InstUpperMidline) { this.InstUpperMidline = data_value.InstUpperMidline; }
    if (data_value.InstLowerMidline) { this.InstLowerMidline = data_value.InstLowerMidline; }
    if (data_value.Overjet) { this.Overjet = data_value.Overjet; }
    if (data_value.Overbite) { this.Overbite = data_value.Overbite; }
    if (data_value.CanineRelationship) { this.CanineRelationship = data_value.CanineRelationship; }
    if (data_value.MolarRelationship) { this.MolarRelationship = data_value.MolarRelationship; }
    if (data_value.PosteriorCrossbite) { this.PosteriorCrossbite = data_value.PosteriorCrossbite; }
    if (data_value.Ipr) { this.Ipr = data_value.Ipr; }
    if (data_value.Attachments) { this.Attachments = data_value.Attachments; }
    if (data_value.Procline) { this.Procline = data_value.Procline; }
    if (data_value.Expand) { this.Expand = data_value.Expand; }
    if (data_value.Distalize) { this.Distalize = data_value.Distalize; }
    if (data_value.AdditionalInformation) { this.AdditionalInformation = data_value.AdditionalInformation; }
    if (data_value.ImpressionShippingPolicy) { this.ImpressionShippingPolicy = data_value.ImpressionShippingPolicy; }
    if (data_value.TreatmentShippingPolicy) { this.TreatmentShippingPolicy = data_value.TreatmentShippingPolicy; }
    if (data_value.CasePrice) { this.CasePrice = data_value.CasePrice; }
    if (data_value.Number) { this.Number = data_value.Number; }
    if (data_value.CaseDate) { this.CaseDate = data_value.CaseDate; }
    if (data_value.UserID) { this.UserID = data_value.UserID; }
    if (data_value.ReturnNotes) { this.ReturnNotes = data_value.ReturnNotes; }
    if (data_value.CaseNumber) { this.CaseNumber = data_value.CaseNumber; }
    if (data_value.PackageID) { this.PackageID = data_value.PackageID; }
    //if (data_value.UserNumber) { this.UserNumber = data_value.UserNumber; }
    return this;
  }
}
export class ECaseTeeth {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public CaseID: string = '00000000-0000-0000-0000-000000000000';
  public ToothID: string = '';
  public DontMove: boolean = false;
  public AvoidAttachments: boolean = false;
  public ExtractTooth: boolean = false;
  public KeepSpaces: boolean = false;

  public LabelUp: string = '';
  public LabelDown: string = '';

  public load(data_value: any): ECaseTeeth {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.CaseID) { this.CaseID = data_value.CaseID; }
    if (data_value.ToothID) { this.ToothID = data_value.ToothID; }
    if (data_value.DontMove) { this.DontMove = data_value.DontMove; }
    if (data_value.AvoidAttachments) { this.AvoidAttachments = data_value.AvoidAttachments; }
    if (data_value.ExtractTooth) { this.ExtractTooth = data_value.ExtractTooth; }
    if (data_value.KeepSpaces) { this.KeepSpaces = data_value.KeepSpaces; }
    return this;
  }
}
export class EPrices {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public Package: EnumPackage;
  public CountryID: string;
  public PackagePrice: number;

  public load(data_value: any): EPrices {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.Package) { this.Package = data_value.Package; }
    if (data_value.CountryID) { this.CountryID = data_value.CountryID; }
    if (data_value.PackagePrice) { this.PackagePrice = data_value.PackagePrice; }
    return this;
  }
}

export class ERevisionTeeth {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public RevisionID: string = '00000000-0000-0000-0000-000000000000';
  public ToothID: string = '';
  public RowKey: string = '';
  public RowValue: number;

  public LabelUp: string = '';
  public LabelDown: string = '';

  public load(data_value: any): ERevisionTeeth {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.RevisionID) { this.RevisionID = data_value.RevisionID; }
    if (data_value.ToothID) { this.ToothID = data_value.ToothID; }
    if (data_value.RowKey) { this.RowKey = data_value.RowKey; }
    if (data_value.RowValue) { this.RowValue = data_value.RowValue; }
    if (data_value.LabelUp) { this.LabelUp = data_value.LabelUp; }
    if (data_value.LabelDown) { this.LabelDown = data_value.LabelDown; }
    return this;
  }
}

export class EPageContents {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public ContentKey: string = '';
  public ContentData: string = '';
  public Version: number = 0;
  public VersionDate: Date = new Date();

  public load(data_value: any): EPageContents {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.ContentKey) { this.ContentKey = data_value.ContentKey; }
    if (data_value.ContentData) { this.ContentData = data_value.ContentData; }
    if (data_value.Version) { this.Version = data_value.Version; }
    if (data_value.VersionDate) { this.VersionDate = data_value.VersionDate; }
    return this;
  }
}

export class ECaseShipment {
  public ID: string = '00000000-0000-0000-0000-000000000000';
  public CaseID: string = '00000000-0000-0000-0000-000000000000';
  public UploadDate: Date = new Date();
  public ShipmnetType: EnumShipmnetType;
  public ShipmnetNumber: number = 0;
  public UpperFrom: number = 0;
  public UpperTo: number = 0;
  public UpperOf: number = 0;
  public LowerFrom: number = 0;
  public LowerTo: number = 0;
  public LowerOf: number = 0;
  public ShipmentPolicy: string = '';

  public load(data_value: any): ECaseShipment {
    if (!data_value) return this;
    if (data_value.ID) { this.ID = data_value.ID; }
    if (data_value.CaseID) { this.CaseID = data_value.CaseID; }
    if (data_value.UploadDate) { this.UploadDate = data_value.UploadDate; }
    if (data_value.ShipmnetType) { this.ShipmnetType = data_value.ShipmnetType; }
    if (data_value.ShipmnetNumber) { this.ShipmnetNumber = data_value.ShipmnetNumber; }
    if (data_value.UpperFrom) { this.UpperFrom = data_value.UpperFrom; }
    if (data_value.UpperTo) { this.UpperTo = data_value.UpperTo; }
    if (data_value.UpperOf) { this.UpperOf = data_value.UpperOf; }
    if (data_value.LowerFrom) { this.LowerFrom = data_value.LowerFrom; }
    if (data_value.LowerTo) { this.LowerTo = data_value.LowerTo; }
    if (data_value.LowerOf) { this.LowerOf = data_value.LowerOf; }
    if (data_value.ShipmentPolicy) { this.ShipmentPolicy = data_value.ShipmentPolicy; }
    return this;
  }
}
