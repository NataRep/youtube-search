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
  private subscriptionSearchTerm!: Subscription;

  constructor(
    private searchService: SearchService,
    private coreService: CoreService
  ) {}

  ngOnInit() {
    this.subscriptionSearchTerm = this.coreService.searchTerm$.subscribe(
      (query) => {
        this.finedVideos = this.searchService.getFoundedVideos(query);
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionSearchTerm.unsubscribe();
  }
}
