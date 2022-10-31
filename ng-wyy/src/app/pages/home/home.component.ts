import { Component, OnInit, ViewChild } from '@angular/core';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { Banner, HotTag, SongSheet } from 'src/app/services/data-types/common.types';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  carouselActiveIndex = 0;
  banners: Banner[] = [];
  hotTags: HotTag[] = [];
  SongSheetS: SongSheet[] = [];
  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel!: NzCarouselComponent;
  constructor(private homeServe: HomeService) {

  }

  ngOnInit(): void {
    this.getBanners();
    this.getHotTags();
    this.getPersonalizedSheetList();
  }

  //获取轮播图
  getBanners(){
    this.homeServe.getBanners().subscribe(banners => 
      this.banners = banners)
  }

  getHotTags(){
    this.homeServe.getHotTags().subscribe(tags => this.hotTags = tags)
  }

  getPersonalizedSheetList(){
    this.homeServe.getPersonalSheetList().subscribe(sheets => this.SongSheetS = sheets)
  }

  onNzBeforeChange(btn : { to:number }) {
    this.carouselActiveIndex = btn.to;
  }

  onChangeSilde(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }
}
