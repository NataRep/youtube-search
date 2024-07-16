import { Component, Input } from '@angular/core';
import { Item, Statistics } from '../../models/search-item.model';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrl: './video-item.component.scss',
})
export class VideoItemComponent {
  @Input() item!: Item;

  statistics!: Statistics;

  OnInit() {
    this.statistics = this.item.statistics;
  }
}
