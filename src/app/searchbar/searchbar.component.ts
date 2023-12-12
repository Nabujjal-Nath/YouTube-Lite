import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  searchQuery: string = '';
  constructor(private apiService: ApiService) { }

  onKeyPress() {
    console.log('Key pressed. Current search query:', this.searchQuery);
    this.apiService.fetchSearchSuggestion(this.searchQuery).pipe(
      catchError((error) => {
        return throwError(() => error);
      }))
      .subscribe((data: any) => {
        console.log("Suggestion:", data)
      })
  }

  search() {
    console.log('Searching for:', this.searchQuery);
  }
}
