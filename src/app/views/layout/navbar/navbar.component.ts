import { Component, OnInit, Inject, Renderer2, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { LoginApiService } from '../../../providers/login-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menuItems: MenuItem[] = [];

  /**
  * Fixed header menu on scroll
  */
  @HostListener('window:scroll', ['$event']) getScrollHeight() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      let header: HTMLElement = document.querySelector('.horizontal-menu') as HTMLElement;
      if (window.pageYOffset >= 60) {
        header.parentElement!.classList.add('fixed-on-scroll')
      } else {
        header.parentElement!.classList.remove('fixed-on-scroll')
      }
    }
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    public auth: LoginApiService
  ) { }

  ngOnInit(): void {
    //if (this.auth.isMemeber()) {
    //  this.menuItems = MENUAdmin;
    //}
    //else {
    //  this.menuItems = MENU;
    //}

    this.menuItems = this.getMenuItems(MENU);

    /**
    * closing the header menu after route change in tablet/mobile devices
    */
    if (window.matchMedia('(max-width: 991px)').matches) {
      this.router.events.forEach((event) => {
        if (event instanceof NavigationEnd) {
          document.querySelector('.horizontal-menu .bottom-navbar')!.classList.remove('header-toggled');
        }
      });
    }
  }

  getMenuItems(items: MenuItem[]): MenuItem[] {
    let result: MenuItem[] = [];
    let role = this.auth.user.Role;
    items.forEach(function (item: MenuItem) {
      if (role == undefined || role.length == 0) {
        if (item.Roles?.length == 0) {
          result.push(item);
        }
      }
      else if (item.Roles?.includes(role)) {
        result.push(item);
      }
    });
    return result;
  }

  goProfile() {
    this.router.navigate(['/dashboard/profile']);
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subMenus !== undefined ? item.subMenus.length > 0 : false;
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();

    this.auth.doLogout(this.auth.user).subscribe(a => {
      this.router.navigate(['/auth/login']);
    }, error => {
      console.debug(error);
      this.router.navigate(['/auth/login']);
    });
  }

  /**
   * Toggle header menu in tablet/mobile devices
   */
  toggleHeaderMenu() {
    document.querySelector('.horizontal-menu .bottom-navbar')!.classList.toggle('header-toggled');
  }

}
