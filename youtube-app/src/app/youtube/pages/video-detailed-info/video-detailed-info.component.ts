import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../../core/models/search-item.model';
import { SearchService } from '../../../core/services/search.service';
import { Location } from '@angular/common';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-video-detailed-info',
  templateUrl: './video-detailed-info.component.html',
  styleUrl: './video-detailed-info.component.scss',
})
export class VideoDetailedInfoComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  videoId: string = '';
  videoURL: string = '';
  video: Item | undefined;
  video$!: Observable<Item>;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.videoId = this.route.snapshot.params['id'];
    this.loadVideo();
  }
  private loadVideo(): void {
    this.video$ = this.searchService.getVideoById(this.videoId);
    this.video$
      .pipe(
        catchError((error) => {
          console.error('Ошибка при загрузке видео:', error);
          this.router.navigate(['/404']);
          return of(null);
        })
      )
      .subscribe((video) => {
        const videoId =
          typeof video!.id === 'string' ? video!.id : video!.id.videoId;
        this.videoURL = `https://www.youtube.com/embed/${videoId}`;
      });
  }

  goBack() {
    const referrer = document.referrer;
    const currentHost = window.location.host;

    if (referrer && new URL(referrer).host === currentHost) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
  }
}
