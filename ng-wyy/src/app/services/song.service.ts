import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, observable, Observable } from 'rxjs';
import { Song, SongUrl } from './data-types/common.types';
import { API_CONFIG } from './services.module';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient,
    @Inject(API_CONFIG) private uri: string) { }

  getSongUrl(ids: string): Observable<SongUrl[]> {
    const params = new HttpParams().set('id', ids);
    return this.http.get<any>(this.uri + 'song/url', { params })
      .pipe(map(((res: { data: SongUrl[] }) => res.data)));
  }

  getSongList(songs: Song | Song[]): Observable<Song[]> {
    const songArr = Array.isArray(songs) ? songs.slice() : [songs];
    const ids = songArr.map(e => e.id).join(',');
    return this.getSongUrl(ids).pipe(map(urls => this.generateSongList(songArr, urls)))
  }

  private generateSongList(songs: Song[], urls: SongUrl[]): Song[] {
    const result: Song[] = [];
    songs.forEach(song => {
      const url = urls.find(url => url.id == song.id)?.url;
      if (url) {
        result.push({ ...song, url });
      }
    });
    return result;
  }
}
