import { Component, Input } from '@angular/core';
import { SocialInfoRowComponent } from '../social-info-row/social-info-row.component';
import { Item, Statistics } from '../../models/search-item.model';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [SocialInfoRowComponent],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent {
  @Input() item!: Item;

  statistics!: Statistics;

  OnInit() {
    this.statistics = this.item.statistics;
  }
}
