import { VideosService } from './../../core/services/videos.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { pipe, startWith } from 'rxjs'

export interface PeriodicElement {
  title: string;
  img: number;
  publishTime: string;
  action: string;
}

const CACHE_KEY = 'httpCache';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['img', 'title', 'publishTime', 'action'];
  dataSource: any;
  show: boolean = false;

  length: number | any;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent | undefined;
  nextPage: any = '';
  prevPage: any = '';

  constructor(private videosService: VideosService) {
    this.dataSource = JSON.parse(localStorage[CACHE_KEY] || '[]')
  }

  ngOnInit(): void {
    this.videos(this.pageSize, '');
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  videos(pageSize: number, pageToken: any) {
    this.videosService.Videos(pageSize, pageToken).subscribe((res) => {

      localStorage[CACHE_KEY] = JSON.stringify(res.items)

      this.nextPage = res.nextPageToken;
      this.prevPage = res.prevPageToken;
      this.length = res.pageInfo.totalResults;

      this.dataSource = [];
      for (let key in res.items) {

        let newDate = new Date(res.items[key].snippet.publishTime);
        res.items[key].snippet.publishTime = newDate.toISOString().slice(0, 10);

        let videoId = { id: res.items[key].id.videoId }
        res.items[key].snippet = { ...res.items[key].snippet, ...videoId }
        this.dataSource.push(res.items[key].snippet);
      }
      this.show = true;
    });

  }



  details(event: any) {
    console.log(event);
  }
  moreData(event: any): any {
    this.pageSize = event.pageSize;
    if (event.pageIndex++) {
      this.videos(this.pageSize, this.nextPage)
    } else if (event.pageIndex--) {
      this.videos(this.pageSize, this.prevPage)
    }
  }
}
