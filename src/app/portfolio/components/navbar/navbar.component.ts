import { AfterViewInit, Component } from '@angular/core';
import { Brand } from 'src/app/shared/enums.const';
import { environment } from 'src/environments/environment';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {

  Brand = Brand;

  brandLinks: any = {
    primary: environment.icons.primary,
    secondary: environment.icons.secondary,
  };

  mouseIn = false;

  get brandSelection(): Brand {
    return !this.menuOpen ? this.Brand.primary : this.Brand.secondary;
  }

  get menuOpen(): boolean {
    return this.navbarService.menuOpen;
  }

  get isAtTop(): boolean {
    return this.navbarService.isAtTop;
  }

  get smallScreen(): boolean {
    return this.navbarService.isSmallScreen;
  }

  get isHomepage(): boolean {
    return this.navbarService.isHomepage;
  }

  constructor(private navbarService: NavbarService) {}

  ngAfterViewInit(): void {
    this.onResize();
  }

  clickBrand(): void {
    this.setMenuOpen(false);
    this.navbarService.menuOpen = false;
  }

  clickMenuButton(): void {
    this.setMenuOpen(!this.navbarService.menuOpen);
  }

  setMenuOpen(menuOpen: boolean): void {
    this.navbarService.menuOpen = menuOpen;
  }

  onResize() {
    this.navbarService.onResize(window.outerWidth);
  }

}
