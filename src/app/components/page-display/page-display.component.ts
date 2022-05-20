import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AwsConnectService } from 'src/app/services/aws-connect.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { PageReadService } from 'src/app/services/page-read.service';
import { allPages, TileType } from 'src/app/services/pages.const';

@Component({
  selector: 'app-page-display',
  templateUrl: './page-display.component.html',
  styleUrls: ['./page-display.component.scss'],
})
export class PageDisplayComponent implements OnInit {
  TileType = TileType;
  pageNotFound = false;

  private _page: any = {};

  get Tiles(): any[] {
    return !this._page || !this._page.tiles ? [] :
      this._page.tiles.sort((a: any, b: any) => {
        return a.order - b.order;
      });
  }

  constructor(
    private pageService: PageReadService,
    private awsService: AwsConnectService,
    private navService: NavbarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this._page = {};
      this.pageNotFound = false;

      this.pageService.getPageByRoute(paramMap.get('path')).subscribe((page) => {
        this._page = page;
        if (!this._page) this.pageNotFound = true;
      });
    });
  }

  offsetClass(index: number, length: number) {
    return index + 1 === length && (index + 1) % 2 == 1;
  }

  onResize(event: any) {
    this.navService.onResize(event.target.width);
  }

}
