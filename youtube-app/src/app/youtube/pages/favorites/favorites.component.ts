import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Item } from '../../../core/models/search-item.model';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../redux/store.model';
import { selectFavoritesVideos } from '../../../redux/selectors';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  isEmpty: boolean = false;
  //ngrx
  videos$: Observable<Item[]>;

  constructor(
    // eslint-disable-next-line @ngrx/no-typed-global-store
    private store: Store<GlobalState>
  ) {
    this.videos$ = this.store.select(selectFavoritesVideos);
  }

  ngOnInit() {
    this.videos$.subscribe((videos) => {
      this.isEmpty = videos.length === 0;
    });
  }

  trackById(index: number, item: Item): string {
    return typeof item.id === 'string' ? item.id : item.id.videoId;
  }
}
