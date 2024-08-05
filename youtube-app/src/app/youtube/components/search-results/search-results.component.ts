import { Component, OnDestroy, OnInit } from '@angular/core';
import { Item } from '../../../core/models/search-item.model';
import { SortService } from '../../../core/services/sort.service';
import { SearchService } from '../../../core/services/search.service';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as AppAction from './../../../redux/actions';
import { selectIsLoading } from '../../../redux/selectors';
import { AppState } from '../../../redux/store.model';

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
  isLoading$!: Observable<boolean>;

  constructor(
    private searchService: SearchService,
    private sortService: SortService,
    // eslint-disable-next-line @ngrx/no-typed-global-store
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(selectIsLoading);
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
    this.store.dispatch(AppAction.getVideos());
    this.finedVideos$ = this.searchService.getVideosWithStatistics(query).pipe(
      tap((videos) => {
        this.isFoundFalse = videos.length === 0;
        this.isEmptySearch = false;
      }),
      catchError(() => {
        this.isFoundFalse = true;
        this.isEmptySearch = true;
        return of([]);
      })
    );
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
