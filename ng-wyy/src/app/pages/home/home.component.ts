import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { map } from 'rxjs';
import { Banner, HotTag, Singer, SongSheet } from 'src/app/services/data-types/common.types';
import { HomeService } from 'src/app/services/home.service';
import { SingerService } from 'src/app/services/singer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  carouselActiveIndex = 0;
  banners: Banner[] = [];
  hotTags: HotTag[] = [];
  songSheets: SongSheet[] = [];
  singers:Singer[] = [];
  @ViewChild(NzCarouselComponent, { static: true }) private nzCarousel!: NzCarouselComponent;
  constructor(private homeServe: HomeService,
    private singerServe: SingerService,
    private route: ActivatedRoute) {
      console.log('route :>> ', this.route.data);
    this.route.data.pipe(map(res => res['homeDatas'])).subscribe(([banners, hotTags, songSheetList, singers])=> {
      this.banners = banners;
      this.hotTags = hotTags;
      this.songSheets = songSheetList;
      this.singers = singers;
    })
  }

  ngOnInit(): void {

  }

  onNzBeforeChange(btn : { to:number }) {
    this.carouselActiveIndex = btn.to;
  }

  onChangeSilde(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }
}
