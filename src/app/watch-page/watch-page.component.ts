import { Component, OnInit } from '@angular/core';
import { catchError, map, switchMap, throwError } from 'rxjs';
import { ApiService } from '../api.service';
import { formatCount } from 'src/utils/common-utils';
import { videoDetailsInterface } from '../model';

@Component({
  selector: 'app-watch-page',
  templateUrl: './watch-page.component.html',
  styleUrls: ['./watch-page.component.scss']
})
export class WatchPageComponent implements OnInit {
  watchVideoDetails: videoDetailsInterface[] = [];
  constructor(private api: ApiService) { }

  ngOnInit() { }
  onVideoIdChange(videoId: string) {
    this.api.fetchVideoInfoAPI(videoId).pipe(
      catchError(error => throwError(() => error)),
      switchMap((data: any) => {
        const videoItem = data.items[0]; // Assuming data.items is an array and you need the first item
        console.log("data is::::", videoItem);
        const channelInfoRequest = this.api.fetchChannelInfoAPI(videoItem.snippet.channelId);
        return channelInfoRequest.pipe(
          catchError(error => throwError(() => error)),
          map((channelInfoResponse: any) => {
            return { videoItem, channelInfoResponse };
          })
        );
      })
    ).subscribe(({ videoItem, channelInfoResponse }) => {
      this.watchVideoDetails = [{
        videoId: videoItem.id,
        thumbnails: videoItem.snippet.thumbnails.medium.url,
        title: videoItem.snippet.title,
        channelTitle: videoItem.snippet.channelTitle,
        viewCount: formatCount(videoItem.statistics.viewCount),
        channelIcon: channelInfoResponse.items[0].snippet.thumbnails.default.url,
        likeCount: formatCount(videoItem.statistics.likeCount)
      }];

      console.log("watch video details:", this.watchVideoDetails);
    });
  }
}
