import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, forkJoin, map, switchMap, throwError } from 'rxjs';
import { videoDetailsInterface } from './model';
import { ApiService } from './api.service';
import { formatCount } from 'src/utils/common-utils';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private isSidebarCollapsedSubject = new BehaviorSubject<boolean>(true);
  isSidebarCollapsed$: Observable<boolean> = this.isSidebarCollapsedSubject.asObservable();
  private searchData = new BehaviorSubject<any>(null);
  searchListData!: videoDetailsInterface[];
  constructor(private api:ApiService){}

  toggleSidebar() {
    this.isSidebarCollapsedSubject.next(!this.isSidebarCollapsedSubject.value);
  }

  setSearchedData(data: any) {
    this.searchData.next(data);
  }

  getSearchedData() {
    return this.searchData.asObservable();
  }

  getSearchedVideoDetails(observable: Observable<any>): Observable<videoDetailsInterface[]> {
    return observable.pipe(
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
      }),
      map(({ searchedVideoItems, channelInfoResponses, videoInfoResponses }: any) => {
        return searchedVideoItems.map((item: any, index: number) => {
          return {
            videoId: item.id.videoId,
            thumbnails: item.snippet.thumbnails.medium.url,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            viewCount: formatCount(videoInfoResponses[index].items[0].statistics.viewCount),
            channelIcon: channelInfoResponses[index].items[0].snippet.thumbnails.default.url,
            videoDescription: item.snippet.description
          };
        });
      })
    );
  }
}