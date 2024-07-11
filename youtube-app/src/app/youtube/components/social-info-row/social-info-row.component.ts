import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { Statistics } from '../../models/search-item.model';

@Component({
  selector: 'app-social-info-row',
  standalone: true,
  imports: [NgFor, NgIf, MatIconModule],
  templateUrl: './social-info-row.component.html',
  styleUrl: './social-info-row.component.scss',
})
export class SocialInfoRowComponent implements OnInit {
  @Input() statistics!: Statistics;

  statisticsKeys!: { key: keyof Statistics; icon: string }[];

  constructor() {}

  ngOnInit() {
    this.statisticsKeys = [
      { key: 'viewCount', icon: 'visibility' },
      { key: 'likeCount', icon: 'thumb_up' },
      { key: 'dislikeCount', icon: 'thumb_down' },
      { key: 'commentCount', icon: 'comment' },
    ];
  }
}
