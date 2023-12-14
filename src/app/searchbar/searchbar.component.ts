import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable, Subject, Subscription, catchError, debounceTime, distinctUntilChanged, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  private searchText$ = new Subject<string>();
  suggestionList = [];
  showSuggestionDropdown=false;
  constructor(private apiService: ApiService) { }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(searchString: string) {
    this.searchText$.next(searchString);
  }

  toggleSuggestionsDropdown(show: boolean) {
    this.showSuggestionDropdown = show;
  }

  searchHandler(){}

  ngOnInit() {
    this.searchText$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(searchString =>
        this.apiService.fetchSearchSuggestion(searchString).pipe(
          catchError((error) => {
            return throwError(() => error);
          })
        )
      )
    ).subscribe((suggestions: any) => {
      console.log("suggestion:", suggestions)
      if (suggestions && suggestions.length === 4) {
        this.suggestionList = suggestions[1];
      } else {
        this.suggestionList = [];
      }
    })
  }


}
