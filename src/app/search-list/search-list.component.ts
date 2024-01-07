import { Component } from '@angular/core';
import { StoreService } from '../store.service';
import { ApiService } from '../api.service';
import { catchError, filter, forkJoin, map, switchMap, throwError } from 'rxjs';
import { formatCount } from 'src/utils/common-utils';
import { videoDetailsInterface } from '../model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent {
  searchListData!: videoDetailsInterface[];
  constructor(private storeService: StoreService) { }
  ngOnInit() {
    this.storeService.getSearchedVideoDetails(this.storeService.getSearchedData()).subscribe((data: videoDetailsInterface[]) => {
      this.searchListData = data;
    })
  }
}
