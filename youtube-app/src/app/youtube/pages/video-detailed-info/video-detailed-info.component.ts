import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../models/search-item.model';
import { SearchService } from '../../services/search.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-video-detailed-info',
  templateUrl: './video-detailed-info.component.html',
  styleUrl: './video-detailed-info.component.scss',
})
export class VideoDetailedInfoComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  videoId: string = '';
  video: Item | undefined;

  constructor(
    private service: SearchService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.videoId = this.route.snapshot.params['id'];
    this.loadVideo();
  }
  private loadVideo(): void {
    this.video = this.service.getVideoById(this.videoId);
    if (!this.video) {
      this.router.navigate(['/404']);
    }
  }

  goBack() {
    // check the address of the previous page in case the detailed description page
    // was accessed via a link not belonging to this application.
    const referrer = document.referrer;
    const currentHost = window.location.host;

    if (referrer && new URL(referrer).host === currentHost) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
