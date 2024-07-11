import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Item } from '../../models/search-item.model';
import { Subscription } from 'rxjs';
import { SearchItemComponent } from '../search-item/search-item.component';
import { MOCKDATA } from './mock-data';
import { SearchService } from '../../services/search.service';

export enum SortOrder {
  ASC = 'ascending',
  DESC = 'descending',
}

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [NgFor, SearchItemComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  videos: Item[] = [];
  filteredVideos: Item[] = [];
  foundVideos: Item[] = [];
  searchQuery: string = '';
  sortQuery: string = '';
  sortDateOrder: SortOrder = SortOrder.ASC;
  sortCountViewOrder: SortOrder = SortOrder.ASC;
  private subscriptionSearchTerm!: Subscription;
  private subscriptionSortTerm!: Subscription;
  private subscriptionSortDate!: Subscription;
  private subscriptionSortCountView!: Subscription;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.videos = MOCKDATA.items;
    this.foundVideos = [];
    this.filteredVideos = [];

    this.subscriptionSearchTerm = this.searchService
      .getSearchTerm()
      .subscribe((term) => {
        this.searchQuery = term;
        this.searchVideos();
      });

    this.subscriptionSortTerm = this.searchService
      .getSortTerm()
      .subscribe((term) => {
        this.sortQuery = term;
        this.filterVideos();
      });

    this.subscriptionSortDate = this.searchService
      .getSortDateOrder()
      .subscribe((order) => {
        this.sortDateOrder = order;
        this.sortVideosByDate();
      });

    this.subscriptionSortCountView = this.searchService
      .getSortCountViewOrder()
      .subscribe((order) => {
        this.sortCountViewOrder = order;
        this.sortVideosByCountView();
      });
  }

  searchVideos(): void {
    console.log('search');
    if (this.searchQuery != '') {
      this.filteredVideos = this.videos.filter((video) =>
        video.snippet.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
      this.foundVideos = this.filteredVideos;
    }
  }

  filterVideos(): void {
    this.filteredVideos = this.foundVideos.filter((video) =>
      video.snippet.title.toLowerCase().includes(this.sortQuery.toLowerCase())
    );
  }

  sortVideosByDate(): void {
    if (this.sortDateOrder === SortOrder.ASC) {
      this.filteredVideos = this.filteredVideos.sort(
        (videoA, videoB) =>
          new Date(videoA.snippet.publishedAt).getTime() -
          new Date(videoB.snippet.publishedAt).getTime()
      );
    } else {
      this.filteredVideos = this.filteredVideos.sort(
        (videoA, videoB) =>
          new Date(videoB.snippet.publishedAt).getTime() -
          new Date(videoA.snippet.publishedAt).getTime()
      );
    }
  }

  sortVideosByCountView(): void {
    if (this.sortCountViewOrder === SortOrder.ASC) {
      this.filteredVideos = this.filteredVideos.sort(
        (videoA, videoB) =>
          Number(videoA.statistics.viewCount) -
          Number(videoB.statistics.viewCount)
      );
    } else {
      this.filteredVideos = this.filteredVideos.sort(
        (videoA, videoB) =>
          Number(videoB.statistics.viewCount) -
          Number(videoA.statistics.viewCount)
      );
    }
  }

  OnDestroy(): void {
    this.subscriptionSearchTerm.unsubscribe();
    this.subscriptionSortTerm.unsubscribe();
    this.subscriptionSortDate.unsubscribe();
    this.subscriptionSortCountView.unsubscribe();
  }
}
