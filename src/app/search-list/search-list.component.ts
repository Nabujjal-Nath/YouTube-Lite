import { Component } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent {
  searchData: any;
  constructor(private storeService: StoreService){}
  ngOnInit() {
    this.storeService.getSearchedData().subscribe(data => {
      this.searchData = data;
      console.log("SEARCHED DATA::",this.searchData);
    });
  }
}
