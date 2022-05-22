import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-fullscreen-menu',
  templateUrl: './fullscreen-menu.component.html',
  styleUrls: ['./fullscreen-menu.component.scss'],
})
export class FullscreenMenuComponent implements OnInit {

  menuData: any[] = [];

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  constructor(private navbarService: NavbarService, private router: Router) {}

  ngOnInit(): void {
    this.navbarService
      .getMenuData()
      .subscribe(
        (menuData) =>
          (this.menuData = menuData.sort((a: any, b: any) => a.order - b.order))
      );
  }

  closeMenu(): void {
    this.navbarService.menuOpen = false;
  }

  goToPath(path: string) {
    this.router.navigate([path]);
    this.closeMenu();
  }

}
