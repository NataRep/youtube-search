import { Component } from '@angular/core';
import { SortService } from '../../../../core/services/sort.service';

@Component({
  selector: 'app-search-sort-tools',
  templateUrl: './search-sort-tools.component.html',
  styleUrl: './search-sort-tools.component.scss',
})
export class SearchSortToolsComponent {
  constructor(private sortService: SortService) {}

  onSubmit(event: Event, term: string): void {
    event.preventDefault();
    this.sortService.filterTerm = term;
  }

  onSortDate(): void {
    this.sortService.sortByDate = true;
    this.sortService.sortByCountView = false;
    this.sortService.forwardDirection = !this.sortService.forwardDirection;
  }

  onSortCount(): void {
    this.sortService.sortByDate = false;
    this.sortService.sortByCountView = true;
    this.sortService.forwardDirection = !this.sortService.forwardDirection;
  }
}
