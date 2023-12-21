import { Component, Input, OnInit } from '@angular/core';
import { catchError, forkJoin, map, switchMap, throwError } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { videoDetailsInterface } from '../model';


@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})

export class VideoCardComponent implements OnInit {
  @Input()
  videoDetails!: videoDetailsInterface;
  @Input()
  isSearchList: boolean = false;
  mostPopularVideos: videoDetailsInterface[] = [];
  constructor(private api: ApiService) { }
  ngOnInit(): void {
  }

  // fetchMostPopularVideos(){
  //   this.api.fetchMostPopularVideosAPI().pipe(
  //       catchError((error) => {
  //         return throwError(() => error);
  //       }))
  //       .subscribe((data:any) => {
  //         console.log(data)
  //         this.mostPopularVideos=data.items.map((item:any)=>{
  //           const icon=this.fetchChannelInfo(item.snippet.channelId)
  //           return {
  //             thumbnails: item.snippet.thumbnails.medium.url,
  //             title: item.snippet.title,
  //             channelTitle: item.snippet.channelTitle,
  //             viewCount: item.statistics.viewCount,
  //             channelIcon:icon
  //           };
  //         })
  //         console.log(this.mostPopularVideos)
  //     });
  // }

}
