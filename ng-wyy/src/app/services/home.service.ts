import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Banner, HotTag, SongSheet } from './data-types/common.types';
import { API_CONFIG, ServicesModule } from './services.module';

@Injectable({
  providedIn: ServicesModule 
})
export class HomeService {

  constructor(private http: HttpClient,
    @Inject(API_CONFIG) private uri: string) { }

  // 获取轮播数据
  getBanners(): Observable<Banner[]> {
    return this.http.get<any>(this.uri + 'banner')
      .pipe(map(((res: { banners: Banner[] }) => res.banners)));
  }

  //获取分类标签
  getHotTags(): Observable<HotTag[]> {
    return this.http.get<any>(this.uri + 'playlist/hot')
      .pipe(map((res: { tags: HotTag[] }) => {
        return res.tags.sort((x, y) => {
          return x.position - y.position;
        }).slice(0, 5);
      }));
  }

  // 获取推荐歌单
  getPersonalSheetList():Observable<SongSheet[]> {
    return this.http.get<any>(this.uri + 'personalized')
    .pipe(map((res: { result: SongSheet[] }) => res.result.slice(0, 16)));
  }
}
