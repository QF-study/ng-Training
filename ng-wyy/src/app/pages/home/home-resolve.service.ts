import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { first, forkJoin, Observable, take } from 'rxjs';
import { Banner, HotTag, Singer, SongSheet } from 'src/app/services/data-types/common.types';
import { HomeService } from 'src/app/services/home.service';
import { SingerService } from 'src/app/services/singer.service';

type HomeDataType = [Banner[], HotTag[], SongSheet[], Singer[]];

@Injectable({
  providedIn: 'root'
})
export class HomeResolveService implements Resolve<HomeDataType> {

  //导航守卫  在进入页面之前请求数据
  constructor(private homeServe: HomeService,
    private singerServe: SingerService) { }
  resolve(): Observable<HomeDataType> {
    return forkJoin([
      this.homeServe.getBanners(),    //获取轮播图
      this.homeServe.getHotTags(),    //获取分类标签
      this.homeServe.getPersonalSheetList(), // 获取推荐歌单
      this.singerServe.getEnterSinger()   // 获取歌手入住的列表
    ]).pipe(first());
    //take(1)只取第一个流
    //first() 效果类似
  }
}
