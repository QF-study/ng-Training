import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { map } from 'rxjs';
import {
  Banner,
  HotTag,
  Singer,
  SongSheet,
} from 'src/app/services/data-types/common.types';
import { HomeService } from 'src/app/services/home.service';
import { SheetService } from 'src/app/services/sheet.service';
import { SingerService } from 'src/app/services/singer.service';
import { AppStoreModule } from 'src/app/store';
import {
  SetCurrentIndex,
  SetPlayList,
  SetSongList,
} from 'src/app/store/actions/player.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  carouselActiveIndex = 0;
  banners: Banner[] = [];
  hotTags: HotTag[] = [];
  songSheets: SongSheet[] = [];
  singers: Singer[] = [];
  @ViewChild(NzCarouselComponent, { static: true })
  private nzCarousel!: NzCarouselComponent;
  constructor(
    private sheetServe: SheetService,
    private route: ActivatedRoute,
    private store$: Store<AppStoreModule>
  ) {
    console.log('route :>> ', this.route.data);
    this.route.data
      .pipe(map((res) => res['homeDatas']))
      .subscribe(([banners, hotTags, songSheetList, singers]) => {
        this.banners = banners;
        this.hotTags = hotTags;
        this.songSheets = songSheetList;
        this.singers = singers;
        console.log(singers);
      });
  }

  ngOnInit(): void {}

  //播放歌单事件
  onPlaySheet(id: number) {
    console.log(id, id);
    this.sheetServe.playSheet(id).subscribe((list) => {
      this.store$.dispatch(SetSongList({ songList: list }));
      this.store$.dispatch(SetPlayList({ playList: list }));
      this.store$.dispatch(SetCurrentIndex({ currentIndex: 0 }));
    });
  }

  onNzBeforeChange(btn: { to: number }) {
    this.carouselActiveIndex = btn.to;
  }

  onChangeSilde(type: 'pre' | 'next') {
    this.nzCarousel[type]();
  }
}
