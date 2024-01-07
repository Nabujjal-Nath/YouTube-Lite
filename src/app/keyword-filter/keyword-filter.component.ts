import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-keyword-filter',
  templateUrl: './keyword-filter.component.html',
  styleUrls: ['./keyword-filter.component.scss']
})
export class KeywordFilterComponent {
  keywords = ['All', 'JavaScript', 'Music', 'Live', 'Gaming', 'News', 'Sports', 'Technology', 'Java', 'Recently uploaded',
    'Indian pop music', 'Mixes'];
  @Output() filterSelect = new EventEmitter<string>();

  selectKeyword(keyword: string) {
    this.filterSelect.emit(keyword);
  }
}
