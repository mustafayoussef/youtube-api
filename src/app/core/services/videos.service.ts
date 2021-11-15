import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideosService {
  url: string = 'https://youtube.googleapis.com/youtube/v3/';
  key: string = 'AIzaSyB8q92jcxQi3K3pQve0xJM_eM_8zLKakX0';
  channelId: string = 'UCJbPGzawDH1njbqV-D5HqKw';

  constructor(private http: HttpClient) { }

  Videos(maxResults: number, pageToken: any): Observable<any> {
    return this.http.get(`${this.url}search`, {
      params: {
        part: 'snippet',
        key: this.key,
        channelId: this.channelId,
        order: 'date',
        maxResults,
        pageToken
      },
    });
  }
  videoDetails(id: any): Observable<any> {
    return this.http.get(`${this.url}videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        key: this.key,
        id
      }
    })
  }
}
