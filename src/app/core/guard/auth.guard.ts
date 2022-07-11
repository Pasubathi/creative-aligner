import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { LoginApiService } from '../../providers/login-api.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private api: LoginApiService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.api.isLogged()) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private api: LoginApiService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.api.isLogged()) {

      if (this.api.user.Role != undefined && this.api.user.Role.length > 0) {
        return true;
      }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
