import { Component, Input, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { getStatusClass } from './date-status.helper';

import { SocialInfoRowComponent } from '../social-info-row/social-info-row.component';
import { Item, Statistics } from '../../models/search-item.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';

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
  }

  getDateStatusClass(publishedAt: string): string {
    return getStatusClass(publishedAt);
  }
}
