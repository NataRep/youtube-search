import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../models/search-item.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-video-detailed-info',
  templateUrl: './video-detailed-info.component.html',
  styleUrl: './video-detailed-info.component.scss',
})
export class VideoDetailedInfoComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  videoId: string = '';
  video: Item | undefined;

  constructor(private service: SearchService, private router: Router) {
    this.videoId = this.route.snapshot.params['id'];
    this.video = this.service.getVideoById(this.videoId)
      ? this.service.getVideoById(this.videoId)
      : undefined;
    if (!this.video) this.router.navigate(['/404']);
  }
}
