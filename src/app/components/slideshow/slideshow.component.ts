import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { TileBaseComponent } from '../tile-base.component';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss']
})
export class SlideshowComponent extends TileBaseComponent implements AfterViewInit {

  constructor(navService: NavbarService,
    router: Router) {
    super(navService, router);
  }

  ngAfterViewInit(): void {
    this.activateSlideshows();
  }

  private activateSlideshows() {
    document.getElementById('book' + this.tile.order + 'btn0')?.classList.add('active');
    document.getElementById('book' + this.tile.order + 'page0')?.classList.add('active');
  }

}