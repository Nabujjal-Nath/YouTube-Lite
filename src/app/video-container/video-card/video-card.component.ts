import { Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
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

  fetchMostPopularVideos(){
    this.api.fetchMostPopularVideosAPI().pipe(
        catchError((error) => {
          return throwError(() => error);
        }))
        .subscribe((data:any) => {
          this.mostPopularVideos=data.items.map((item:any)=>{
            return {
              thumbnails: item.snippet.thumbnails.medium.url,
              title: item.snippet.title,
              channelTitle: item.snippet.channelTitle,
              viewCount: item.statistics.viewCount
            };
          })
          console.log(this.mostPopularVideos)
      });
  }
  
}
