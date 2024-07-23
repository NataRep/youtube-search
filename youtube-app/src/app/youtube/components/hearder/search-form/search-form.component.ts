import { Component } from '@angular/core';
import { SortService } from '../../../../core/services/sort.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  constructor(private sortService: SortService, private router: Router) {}

  searchResults(event: Event, query: string) {
    event.preventDefault();
    this.sortService.searchTerm = query;
    this.router.navigate(['/']);
  }
}
