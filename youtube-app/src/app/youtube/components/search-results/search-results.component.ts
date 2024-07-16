import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/search-item.model';
import { CoreService } from '../../../core/services/core.service';
import { SearchService } from '../../services/search.service';
import { MOCKDATA } from '../../../../assets/images/mockdata';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  finedVideos!: Item[];
  subscriptionSearchTerm!: Item[];
  searchQuery!: string;

  constructor(
    private searchService: SearchService,
    private coreService: CoreService
  ) {}

  ngOnInit() {
    this.finedVideos = MOCKDATA.items;
    /* this.finedVideos = this.searchService.getFoundedVideos(
      this.coreService.searchTerm
    );

    */
  }
}
