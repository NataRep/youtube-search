import { Component } from '@angular/core';
import { CoreService } from '../../../services/core.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  constructor(private coreService: CoreService) {}

  filterResults(event: Event, query: string) {
    event.preventDefault();
    this.coreService.searchTerm = query;
  }
}
