import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-search-cource-form',
  templateUrl: './search-cource-form.component.html',
  styleUrls: ['./search-cource-form.component.scss']
})
export class SearchCourceFormComponent {
  @Output() readonly search = new EventEmitter<string>();

  private segmentInternal = '';
  set segment(value: string) {
    this.segmentInternal = value == null ? '' : value;
  }
  get segment() {
    return this.segmentInternal;
  }

  onSearch() {
    this.search.emit(this.segmentInternal);
  }
}
