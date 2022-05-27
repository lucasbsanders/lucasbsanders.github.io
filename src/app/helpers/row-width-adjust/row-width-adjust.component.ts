import { Component, Input } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { Width } from 'src/app/services/pages.const';

@Component({
  selector: 'app-row-width-adjust',
  templateUrl: './row-width-adjust.component.html',
  styleUrls: ['./row-width-adjust.component.scss'],
})
export class RowWidthAdjustComponent {
  @Input() width = '';

  Width = Width;

  get isMedium(): boolean {
    return this.navbarService.isMediumScreen;
  }

  constructor(private navbarService: NavbarService) {}
}