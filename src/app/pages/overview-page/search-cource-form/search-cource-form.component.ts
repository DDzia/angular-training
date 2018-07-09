import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-cource-form',
  templateUrl: './search-cource-form.component.html',
  styleUrls: ['./search-cource-form.component.scss']
})
export class SearchCourceFormComponent {
  searchSegment = '';

  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchSegment);
    console.log(`on search: '${this.searchSegment}'`);
  }
}
