import { Component, Input, OnInit } from '@angular/core';
import { Statistics } from '../../../core/models/search-item.model';

@Component({
  selector: 'app-social-info',
  templateUrl: './social-info.component.html',
  styleUrl: './social-info.component.scss',
})
export class SocialInfoComponent implements OnInit {
  @Input() statistics: Statistics | undefined = undefined;

  statisticsKeys!: { key: keyof Statistics; icon: string }[];

  ngOnInit() {
    this.statisticsKeys = [
      { key: 'viewCount', icon: 'visibility' },
      { key: 'likeCount', icon: 'thumb_up' },
      { key: 'dislikeCount', icon: 'thumb_down' },
      { key: 'commentCount', icon: 'comment' },
    ];
  }
}
