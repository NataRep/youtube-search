import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../models/search-item.model';
import { CoreService } from '../../../core/services/core.service';
import { SearchService } from '../../services/search.service';
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
    private coreService: CoreService
  ) {}

  ngOnInit() {
    this.subscriptionSearchTerm = this.coreService.searchTerm$.subscribe(
      (query) => {
        if (query.trim() !== '') {
          this.finedVideos = this.searchService.getFoundedVideos(query);
          this.isFoundFalse = this.finedVideos.length < 1;
          this.isEmptySearch = false;
        } else {
          this.finedVideos = [];
          this.isEmptySearch = true;
          this.isFoundFalse = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionSearchTerm.unsubscribe();
  }
}
