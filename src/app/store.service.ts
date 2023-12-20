import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private isSidebarCollapsedSubject = new BehaviorSubject<boolean>(true);
  isSidebarCollapsed$: Observable<boolean> = this.isSidebarCollapsedSubject.asObservable();
  private searchData = new BehaviorSubject<any>(null);

  toggleSidebar() {
    this.isSidebarCollapsedSubject.next(!this.isSidebarCollapsedSubject.value);
  }

  setSearchedData(data: any) {
    this.searchData.next(data);
  }

  getSearchedData() {
    return this.searchData.asObservable();
  }
}