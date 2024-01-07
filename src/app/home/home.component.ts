import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { videoDetailsInterface } from '../model';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  lists: videoDetailsInterface[] = []
  constructor(private apiService: ApiService,
    private storeService: StoreService) { }
  onFilterSelect(keyword: string) {
    console.log("keyword is:", keyword)
    this.storeService.getSearchedVideoDetails(this.apiService.fetchSearchListAPI(keyword)).subscribe((data: videoDetailsInterface[]) => {
      this.lists = data;
    })
  }

}
