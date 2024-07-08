import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { getStatusClass } from './date-status.helper';

import { SocialInfoRowComponent } from '../social-info-row/social-info-row.component';
import { Item, Statistics } from '../../models/search-item.model';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-search-item',
  standalone: true,
  imports: [NgClass, SocialInfoRowComponent, ButtonComponent],
  templateUrl: './search-item.component.html',
  styleUrl: './search-item.component.scss',
})
export class SearchItemComponent implements OnInit {
  @Input() item!: Item;

  statistics!: Statistics;
  dateStatusClass!: string;

  ngOnInit() {
    this.statistics = this.item.statistics;
    this.dateStatusClass = this.getDateStatusClass(
      this.item.snippet.publishedAt
    );
    console.log(this.item.snippet.publishedAt);
    console.log(`Date status class:${this.dateStatusClass}`);
  }

  getDateStatusClass(publishedAt: string): string {
    console.log(getStatusClass(publishedAt));
    return getStatusClass(publishedAt);
  }
}
