import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable, pluck, switchMap } from 'rxjs';
import { Song, SongSheet } from './data-types/common.types';
import { API_CONFIG } from './services.module';
import { SongService } from './song.service';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  constructor(private http: HttpClient,
    private songServe: SongService,
    @Inject(API_CONFIG) private uri: string) { }

  //获取分类标签
  getSongSheetDetail(id: number): Observable<SongSheet> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<any>(this.uri + 'playlist/detail', { params })
      .pipe(map(((res: { playlist: SongSheet }) => res.playlist)));
  }

  //pluck('name')  挑选属性进行发出
  playSheet(id: number): Observable<Song[]> {
    return this.getSongSheetDetail(id)
      .pipe(
        map(e => e.tracks),
        switchMap(tracks => this.songServe.getSongList(tracks))
      )
  }


}
