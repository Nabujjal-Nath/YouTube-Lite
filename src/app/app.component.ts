import { Component } from '@angular/core';
import { StoreService } from './store.service';
import { environment } from 'src/environments/environment';
import { MOST_POPULAR_VIDEOS } from 'src/utils/constant';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[StoreService]
})
export class AppComponent {
  title = 'YouTube-lite';
  constructor(){
    this.abc();
  }
  abc(){
    console.log("HII:",MOST_POPULAR_VIDEOS);
  }
}
