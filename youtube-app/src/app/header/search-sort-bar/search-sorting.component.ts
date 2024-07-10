import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SearchService } from '../../search/search.service';

@Component({
  selector: 'app-search-sorting',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule],
  templateUrl: './search-sorting.component.html',
  styleUrl: './search-sorting.component.scss',
})
export class SearchSortingComponent {
  inputControl = new FormControl('');

  constructor(private searchService: SearchService) {}

  onSortTerm() {
    if (!this.inputControl.value) {
      this.searchService.setSortTerm('');
    } else if (this.inputControl.value) {
      this.searchService.setSortTerm(this.inputControl.value);
    }
  }

  onSubmit(event: Event): void {
    this.onSortTerm();
    event.preventDefault();
  }
}
