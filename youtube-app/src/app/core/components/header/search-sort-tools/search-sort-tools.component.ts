import { Component } from '@angular/core';
import { CoreService } from '../../../services/core.service';

@Component({
  selector: 'app-search-sort-tools',
  templateUrl: './search-sort-tools.component.html',
  styleUrl: './search-sort-tools.component.scss',
})
export class SearchSortToolsComponent {
  constructor(private coreService: CoreService) {}

  onSubmit(event: Event, term: string): void {
    event.preventDefault();
    this.coreService.filterTerm = term;
  }

  onSortDate(): void {
    this.coreService.sortByDate = true;
    this.coreService.sortByCountView = false;
  }

  onSortCount(): void {
    this.coreService.sortByDate = false;
    this.coreService.sortByCountView = true;
  }
}
