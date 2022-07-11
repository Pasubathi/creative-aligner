import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AdminGuard, AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';


const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/users/userauth.module').then(m => m.UserAuthModule) },
  {
    path: 'dashboard',
    component: BaseComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/start/docdashboard.module').then(m => m.DocdashboardModule)
      
  },
  {
    path: 'case',
    component: BaseComponent,
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/cases/cases.module').then(m => m.CasesModule)
  },
  {
    path: 'admin',
    component: BaseComponent,
    canActivate: [AdminGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  { 
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
