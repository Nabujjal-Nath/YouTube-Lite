import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MOST_POPULAR_VIDEOS } from 'src/utils/constant';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchMostPopularVideosAPI() {
    return this.http.get(`${MOST_POPULAR_VIDEOS}`)
  }
}
