import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MOST_POPULAR_VIDEOS } from 'src/utils/constant';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetchMostPopularVideos() {
    this.http.get(`${MOST_POPULAR_VIDEOS}`).pipe(
      catchError((error) => {
        return throwError(() => error);})
    )
    .subscribe(data => {
      console.log(data);
    });
  }
}
