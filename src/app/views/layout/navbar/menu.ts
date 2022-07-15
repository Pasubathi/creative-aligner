import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'grid',
    link: '/dashboard/cases',
    Roles: []
  },
  {
    label: 'Submit New Case',
    icon: 'briefcase',
    link: '/case/newcase',
    Roles: []
  } ,
  {
    label: 'My Account',
    icon: 'user',
    link: '/dashboard/profile',
    Roles: []
  } ,
//];

//export const MENUAdmin: MenuItem[] = [
  {
    label: 'Admin Dashboard',
    icon: 'home',
    link: '/admin/home',
    Roles: ['Admin', 'Designer', 'Accountant', 'MedicalRepresentative', 'Orthodontist', 'OperationManager', 'Logistics']
  },
  {
    label: 'Doctors',
    icon: 'users',
    link: '/admin/doctors',
    Roles: ['Admin', 'OperationManager', 'MedicalRepresentative']
  },
  {
    label: 'Users',
    icon: 'users',
    link: '/admin/users',
    Roles: ['Admin', 'OperationManager']
  },
  {
    label: 'Pending Messages',
    icon: 'message-square',
    link: '/admin/pending',
    Roles: ['Admin', 'Designer', 'OperationManager', 'MedicalRepresentative']
  },
  {
    label: 'Terms and Agreement',
    icon: 'list',
    link: '/admin/terms',
    Roles: ['Admin', 'OperationManager', 'Accountant']
  },
  {
    label: 'Emails Settings',
    icon: 'mail',
    link: '/admin/emails',
    Roles: ['Admin']
  },
  {
    label: 'Settings',
    icon: 'settings',
    Roles: ['Admin', 'Accountant'],
    subMenus: [
      {
        subMenuItems: [
          {
            label: 'Packages',
            isTitle: true
          },
          {
            label: 'Packages Prices',
            link: '/admin/packages',
          }
        ]
      },
      //{
      //  subMenuItems: [
      //    {
      //      label: 'Admin users',
      //      isTitle: true
      //    },
      //    {
      //      label: 'Admin user',
      //      link: '/admin/xxx',
      //    }
      //  ]
      //}
    ]
  }

  
];
