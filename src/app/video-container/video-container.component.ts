import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { catchError, forkJoin, map, switchMap, throwError } from 'rxjs';
import { MostPopularVideosInterface } from 'src/utils/interface';


@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.scss']
})
export class VideoContainerComponent implements OnInit {
  mostPopularVideos: MostPopularVideosInterface[] = [];
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.fetchMostPopularVideos();
  }

  fetchMostPopularVideos() {
    this.api.fetchMostPopularVideosAPI().pipe(
      catchError((error) => throwError(() => error)),
      switchMap((data: any) => {
        console.log("data is:", data)
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
      console.log("channelInfoResponses:", channelInfoResponses)
      this.mostPopularVideos = videoItems.map((item: any, index: number) => {
        return {
          thumbnails: item.snippet.thumbnails.medium.url,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          viewCount: this.formatViewCount(item.statistics.viewCount),
          channelIcon: channelInfoResponses[index].items[0].snippet.thumbnails.default.url
        };
      });
      console.log(this.mostPopularVideos);
    });
  }

  fetchChannelInfo(id: string) {
    this.api.fetchChannelInfoAPI(id).pipe(
      catchError((error) => {
        return throwError(() => error);
      }))
      .subscribe((data: any) => {
        return data.items[0].snippet.thumbnails.default.url;
      });
  }

  formatViewCount(viewCount: number): string {
    const suffixes = ['', 'K', 'M', 'B'];
    let scaleIndex = 0;
    while (viewCount >= 1000 && scaleIndex < suffixes.length - 1) {
      viewCount /= 1000;
      scaleIndex++;
    }
    return `${viewCount.toFixed(scaleIndex === 0 ? 0 : 1)}${suffixes[scaleIndex]}`;
  }

}