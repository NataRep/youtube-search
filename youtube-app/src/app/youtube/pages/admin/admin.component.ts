import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Item } from '../../../core/models/search-item.model';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../redux/store.model';
import {
  selectCustomAndYoutubeVideo,
  selectError,
  selectIsLoading,
} from '../../../redux/selectors';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  //ngrx
  isLoading$: Observable<boolean>;
  videos$: Observable<Item[]>;
  error$: Observable<string | null>;

  constructor(
    // eslint-disable-next-line @ngrx/no-typed-global-store
    private store: Store<GlobalState>
  ) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
    this.videos$ = this.store.select(selectCustomAndYoutubeVideo);
  }

  trackById(index: number, item: Item): string {
    return typeof item.id === 'string' ? item.id : item.id.videoId;
  }
}
