import { Component, Input, OnInit } from '@angular/core';
import { Item, Statistics } from '../../../core/models/search-item.model';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrl: './video-item.component.scss',
})
export class VideoItemComponent implements OnInit {
  @Input() item!: Item;

  statistics!: Statistics;

  ngOnInit() {
    this.statistics = this.item.statistics;
  }
  getItemPublishedDate(): string {
    return this.item.snippet.publishedAt;
  }
}
