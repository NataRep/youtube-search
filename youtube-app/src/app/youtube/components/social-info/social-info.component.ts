import { Component, Input } from '@angular/core';
import { Statistics } from '../../models/search-item.model';

@Component({
  selector: 'app-social-info',
  templateUrl: './social-info.component.html',
  styleUrl: './social-info.component.scss',
})
export class SocialInfoComponent {
  @Input() statistics!: Statistics;

  statisticsKeys!: { key: keyof Statistics; icon: string }[];

  OnInit() {
    this.statisticsKeys = [
      { key: 'viewCount', icon: 'visibility' },
      { key: 'likeCount', icon: 'thumb_up' },
      { key: 'dislikeCount', icon: 'thumb_down' },
      { key: 'commentCount', icon: 'comment' },
    ];
  }
}
