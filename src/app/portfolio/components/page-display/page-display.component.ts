import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { PageDefault } from 'src/app/shared/classes.const';
import { Page } from 'src/app/shared/interfaces.const';
import { PageType, TileType, Width } from '../../../shared/enums.const';
import { NavbarService } from '../../services/navbar.service';
import { PageReadService } from '../../services/page-read.service';

@Component({
  selector: 'app-page-display',
  templateUrl: './page-display.component.html',
  styleUrls: ['./page-display.component.scss'],
})
export class PageDisplayComponent implements OnInit {

  TileType = TileType;
  Width = Width;
  PageType = PageType;

  @Input() pageObs = new Observable<Page>();

  page: Page = new PageDefault();
  pageNotFound = false;

  constructor(
    private navbarService: NavbarService,
    private pageService: PageReadService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap: any) => {
          this.page = new PageDefault();
          this.pageNotFound = false;
          const path = paramMap.get('path');

          this.navbarService.setRoute(path);
          return this.pageService.getPageByRoute(path);
        })
      )
      .subscribe((page: Page) => this.setPage(page));

    this.pageObs.subscribe((page: Page) => this.setPage(page));
  }

  setPage(page: Page) {
    this.page = page;
        
    if (!this.page) this.pageNotFound = true;
    else if (this.page.tiles) this.page.tiles.sort((a: any, b: any) => a.order - b.order);
  }

}
