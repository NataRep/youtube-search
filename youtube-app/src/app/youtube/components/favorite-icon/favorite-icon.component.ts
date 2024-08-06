import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../../../core/models/search-item.model';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../redux/store.model';
import * as AppAction from './../../../redux/actions';
import { map, Observable, take } from 'rxjs';
import { selectFavoritesVideos } from '../../../redux/selectors';

@Component({
  selector: 'app-favorite-icon',
  templateUrl: './favorite-icon.component.html',
  styleUrl: './favorite-icon.component.scss',
})
export class FavoriteIconComponent implements OnInit {
  @Input() item!: Item;
  isFavorite$!: Observable<boolean>;

  // eslint-disable-next-line @ngrx/no-typed-global-store
  constructor(private store: Store<GlobalState>) {}

  ngOnInit(): void {
    this.isFavorite$ = this.store.select(selectFavoritesVideos).pipe(
      map((favorites) => {
        console.log('Favorites array:', favorites);
        console.log('Item ID:', this.item.id);
        console.log(
          'IsFavorites:',
          favorites.some((video) => {
            console.log('check works');
            return video.id === this.item.id;
          })
        );
        return favorites.some((video) => {
          console.log('check works');
          return video.id === this.item.id;
        });
      })
    );
  }

  addToFavorite() {
    console.log('add:', this.item);
    this.store.dispatch(AppAction.addVideosToFavorites({ video: this.item }));
  }

  removeFromFavorite() {
    console.log('remove:', this.item);
    this.store.dispatch(
      AppAction.removeVideosFromFavorites({ video: this.item })
    );
  }

  onClick() {
    this.isFavorite$.pipe(take(1)).subscribe((isFavorite) => {
      if (isFavorite) {
        this.removeFromFavorite();
      } else {
        this.addToFavorite();
      }
    });
  }
}
