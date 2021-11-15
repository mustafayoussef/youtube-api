import { VideosService } from './../../core/services/videos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {
  id: any;
  img: any;
  title: string = '';
  like: any;
  view: any;
  duration: any;
  publishedAt: any;
  description: any;
  rating: number;
  constructor(private videosService: VideosService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.rating = 0;


  }

  ngOnInit(): void {
    this.videoDetails(this.id)
  }

  videoDetails(id: any) {
    this.videosService.videoDetails(id).subscribe(res => {
      console.log(res.items[0])
      this.img = res.items[0].snippet.thumbnails.standard.url
      this.title = res.items[0].snippet.title
      this.description = res.items[0].snippet.description

      this.publishedAt = res.items[0].snippet.publishedAt
      let date = new Date(this.publishedAt)
      this.publishedAt = date.toLocaleDateString('default', { year: "numeric", month: "short", day: "numeric" })

      this.view = res.items[0].statistics.viewCount
      this.like = res.items[0].statistics.likeCount

      this.duration = res.items[0].contentDetails.duration
      this.duration = this.duration.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "")

    })
  }

  change(e: any) {
    console.log(e);
  }
}
