import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CHANNEL_BY_ID, MOST_POPULAR_VIDEOS, SEARCH_LIST, SEARCH_SUGGESTION } from 'src/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchMostPopularVideosAPI() {
    return this.http.get(`${MOST_POPULAR_VIDEOS}`);
  }
  
  fetchChannelInfoAPI(id:string) {
    return this.http.get(`${CHANNEL_BY_ID}${id}`);
  }

  fetchSearchSuggestionAPI(searchQuery:string){
    return this.http.get(SEARCH_SUGGESTION + searchQuery);
  }

  fetchSearchListAPI(searchQuery:string){
    return this.http.get(SEARCH_LIST + searchQuery);
  }
}
