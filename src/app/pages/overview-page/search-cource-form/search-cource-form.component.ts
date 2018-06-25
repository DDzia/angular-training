import { Component } from '@angular/core';

@Component({
  selector: 'app-search-cource-form',
  templateUrl: './search-cource-form.component.html',
  styleUrls: ['./search-cource-form.component.scss']
})
export class SearchCourceFormComponent {
  searchSegment = '';

  onSearch() {
    console.log(`on search: '${this.searchSegment}'`);
  }
}
