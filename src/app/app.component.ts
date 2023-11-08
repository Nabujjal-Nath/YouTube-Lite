import { Component } from '@angular/core';
import { StoreService } from './store.service';
import { MOST_POPULAR_VIDEOS } from 'src/utils/constant';
import { ApiService } from './api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[StoreService]
})
export class AppComponent {
  title = 'YouTube-lite';
}
