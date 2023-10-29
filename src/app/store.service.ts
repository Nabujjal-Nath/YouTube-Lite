import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private isSidebarCollapsedSubject = new BehaviorSubject<boolean>(true);
  isSidebarCollapsed$: Observable<boolean> = this.isSidebarCollapsedSubject.asObservable();

  toggleSidebar() {
    this.isSidebarCollapsedSubject.next(!this.isSidebarCollapsedSubject.value);
  }
}