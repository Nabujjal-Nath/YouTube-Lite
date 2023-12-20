import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Subject, catchError, debounceTime, distinctUntilChanged, switchMap, throwError } from 'rxjs';
import { StoreService } from '../store.service';
import { isNullOrUndefined } from 'src/utils/common-utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  private searchText$ = new Subject<string>();
  searchString!: string;
  suggestionList = [];
  showSuggestionDropdown = false;
  constructor(private router: Router,
    private apiService: ApiService,
    private storeService: StoreService) { }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  search(searchString: string) {
    this.searchText$.next(searchString);
  }

  toggleSuggestionsDropdown(show: boolean) {
    this.showSuggestionDropdown = show;
  }

  searchHandler() {
    if (!isNullOrUndefined(this.searchString) && this.searchString!='') {
      this.apiService.fetchSearchListAPI(this.searchString).pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      ).subscribe((list) => {
        console.log("searched list:", list);
        this.storeService.setSearchedData(list);
      })
      this.router.navigate(['/result'], { queryParams: { search_query: this.searchString } });
    }
  }

  ngOnInit() {
    this.searchText$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchString) => {
        this.searchString = searchString;
        return this.apiService.fetchSearchSuggestionAPI(searchString).pipe(
          catchError((error) => {
            return throwError(() => error);
          })
        )
      }
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
