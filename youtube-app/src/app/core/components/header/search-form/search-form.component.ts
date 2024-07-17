import { Component } from '@angular/core';
import { CoreService } from '../../../services/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  constructor(private coreService: CoreService, private router: Router) {}

  searchResults(event: Event, query: string) {
    event.preventDefault();
    this.coreService.searchTerm = query;
    this.router.navigate(['/']);
  }
}
