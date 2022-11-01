import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Singer } from './data-types/common.types';
import { API_CONFIG } from './services.module';

type SingerParams = {
  offset: number;
  limit: number;
  cat?: string;
}

const defaultParams: SingerParams = {
  offset: 0,
  limit: 9,
  cat: '5001'
}

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  constructor(private http: HttpClient,
    @Inject(API_CONFIG) private uri: string) { }

  // 获取歌手入住的列表
  getEnterSinger(args: SingerParams = defaultParams): Observable<Singer[]> {
    const params = new HttpParams({ fromString: JSON.stringify(args) });
    return this.http.get<any>(this.uri + 'artist/list', { params })
      .pipe(map(((res: { artists: Singer[] }) => res.artists)));
  }
}
