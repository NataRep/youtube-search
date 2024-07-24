import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../../core/models/search-item.model';
import { SortService } from '../../../core/services/sort.service';
import { SearchService } from '../../../core/services/search.service';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  finedVideos$!: Observable<Item[]>;
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
    this.resetSearch();
    this.finedVideos$ = this.searchService.getVideosWithStatistics(query);
    this.finedVideos$.subscribe((videos) => {
      this.isFoundFalse = videos.length < 1;
      this.isEmptySearch = false;
    });
  }

  resetSearch(): void {
    this.finedVideos$ = of([]);
    this.isEmptySearch = true;
    this.isFoundFalse = false;
  }

  ngOnDestroy() {
    this.subscriptionSearchTerm.unsubscribe();
  }
}
