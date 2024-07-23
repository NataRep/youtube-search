import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../../core/models/search-item.model';
import { SortService } from '../../../core/services/sort.service';
import { SearchService } from '../../../core/services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  finedVideos!: Item[];
  isFoundFalse: boolean = true;
  isEmptySearch: boolean = true;
  private subscriptionSearchTerm!: Subscription;

  constructor(
    private searchService: SearchService,
    private sortService: SortService
  ) {}

  ngOnInit() {
    this.subscriptionSearchTerm = this.sortService.searchTerm$.subscribe(
      (query) => {
        if (query.trim() !== '') {
          this.searchVideo(query);
        } else {
          this.resetSearch();
        }
      }
    );
  }
  searchVideo(query: string): void {
    this.finedVideos = this.searchService.getFoundedVideos(query);
    this.isFoundFalse = this.finedVideos.length < 1;
    this.isEmptySearch = false;
  }

  resetSearch(): void {
    this.finedVideos = [];
    this.isEmptySearch = true;
    this.isFoundFalse = false;
  }

  ngOnDestroy() {
    this.subscriptionSearchTerm.unsubscribe();
  }
}
