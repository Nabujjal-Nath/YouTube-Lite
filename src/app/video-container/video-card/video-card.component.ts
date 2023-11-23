import { Component, OnInit } from '@angular/core';
import { catchError, forkJoin, map, switchMap, throwError } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { MostPopularVideosInterface } from 'src/utils/interface';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})

export class VideoCardComponent implements OnInit {
  mostPopularVideos: MostPopularVideosInterface[]=[];
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.fetchMostPopularVideos();
  }

  fetchMostPopularVideos() {
    this.api.fetchMostPopularVideosAPI().pipe(
      catchError((error) => throwError(() => error)),
      switchMap((data: any) => {
        const videoItems = data.items;
        const channelInfoRequests = videoItems.map((item: any) => {
          return this.api.fetchChannelInfoAPI(item.snippet.channelId);
        });
        return forkJoin(channelInfoRequests).pipe(
          catchError((error) => throwError(() => error)),
          map((channelInfoResponses: any) => {
            return { videoItems, channelInfoResponses };
          })
        );
      })
    ).subscribe(({ videoItems, channelInfoResponses }: any) => {
      this.mostPopularVideos = videoItems.map((item: any, index: number) => {
        return {
          thumbnails: item.snippet.thumbnails.medium.url,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          viewCount: item.statistics.viewCount,
          channelIcon: channelInfoResponses[index].items[0].snippet.thumbnails.default.url
        };
      });
      console.log(this.mostPopularVideos);
    });
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

  fetchChannelInfo(id:string){
    this.api.fetchChannelInfoAPI(id).pipe(
        catchError((error) => {
          return throwError(() => error);
        }))
        .subscribe((data:any) => {
          return data.items[0].snippet.thumbnails.default.url;
      });
  }
  
}
