import { Component } from '@angular/core';
import { StoreService } from '../store.service';
import { ApiService } from '../api.service';
import { catchError, filter, forkJoin, map, switchMap, throwError } from 'rxjs';
import { formatViewCount } from 'src/utils/common-utils';
import { videoDetailsInterface } from '../model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent {
  searchListData!: videoDetailsInterface[];
  constructor(private api: ApiService,
    private storeService: StoreService){}
  ngOnInit() {
    this.storeService.getSearchedData().pipe(
      filter(data => data !== null && data.items && Array.isArray(data.items)),
      catchError((error) => throwError(() => error)),
      switchMap((data: any) => {
        console.log("data is search:::::", data)
        const searchedVideoItems = data.items.filter((item: any) => item.id && item.id.videoId);
        const channelInfoRequests = searchedVideoItems.map((item: any) => {
          return this.api.fetchChannelInfoAPI(item.snippet.channelId);
        });
        const videoInfoRequests = searchedVideoItems.map((item: any) => {
          return this.api.fetchVideoInfoAPI(item.id.videoId);
        });
        return forkJoin([forkJoin(channelInfoRequests), forkJoin(videoInfoRequests)]).pipe(
          catchError((error) => throwError(() => error)),
          map(([channelInfoResponses, videoInfoResponses]: [any, any]) => ({
            searchedVideoItems, channelInfoResponses, videoInfoResponses
          }))
        );
      })
    ).subscribe(({ searchedVideoItems, channelInfoResponses, videoInfoResponses }: any) => {
      this.searchListData = searchedVideoItems.map((item: any, index: number) => {
        return {
          videoId: item.id.videoId,
          thumbnails: item.snippet.thumbnails.medium.url,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          viewCount: formatViewCount(videoInfoResponses[index].items[0].statistics.viewCount),
          channelIcon: channelInfoResponses[index].items[0].snippet.thumbnails.default.url
        };
      });
      console.log("SSS::", this.searchListData);
    });
  }
}
