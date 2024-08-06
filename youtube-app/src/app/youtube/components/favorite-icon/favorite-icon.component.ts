import { Component, Input } from '@angular/core';
import { Item } from '../../../core/models/search-item.model';

@Component({
  selector: 'app-favorite-icon',
  templateUrl: './favorite-icon.component.html',
  styleUrl: './favorite-icon.component.scss',
})
export class FavoriteIconComponent {
  @Input() item!: Item;
  isFavorite: boolean = false;

  constructor() {}

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  addToFavorite() {
    console.log('add:', this.item);
  }

  removeFromFavorite() {
    console.log('remove:', this.item);
  }

  onClick() {
    this.toggleFavorite();
    this.isFavorite ? this.addToFavorite() : this.removeFromFavorite();
  }
}
