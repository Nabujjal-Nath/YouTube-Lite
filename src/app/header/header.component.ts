import { Component } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private storeService: StoreService) {}

  toggleSidebar() {
    this.storeService.toggleSidebar();
  }
}
