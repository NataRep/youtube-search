import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../../core/models/search-item.model';
import { SearchService } from '../../../core/services/search.service';
import { Location } from '@angular/common';
import { catchError, Observable, of, Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../redux/store.model';
import { selectCustomVideoById } from '../../../redux/selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-video-detailed-info',
  templateUrl: './video-detailed-info.component.html',
  styleUrls: ['./video-detailed-info.component.scss'],
})
export class VideoDetailedInfoComponent implements OnInit, OnDestroy {
  route: ActivatedRoute = inject(ActivatedRoute);
  videoId: string = '';
  videoURL: string = '';
  video: Item | undefined;
  video$!: Observable<Item>;
  isCustomVideo!: boolean;
  videoType!: string;
  private unsubscribe$ = new Subject<void>();
  private subscriptions: Subscription = new Subscription();

  constructor(
    private searchService: SearchService,
    private router: Router,
    private location: Location,
    // eslint-disable-next-line @ngrx/no-typed-global-store
    private store: Store<GlobalState>
  ) {}

  ngOnInit(): void {
    this.videoId = this.route.snapshot.params['id'];
    this.checkVideoInState();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.subscriptions.unsubscribe();
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

  checkVideoInState(): void {
    const sub = this.store
      .select(selectCustomVideoById(this.videoId))
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((error) => {
          console.error('Ошибка при проверке видео в стейте:', error);
          return of(null);
        })
      )
      .subscribe((video) => {
        if (video) {
          this.handleCustomVideoFound(video);
        } else {
          this.handleCustomVideoNotFound();
        }
      });

    this.subscriptions.add(sub);
  }

  handleCustomVideoFound(video: Item): void {
    this.videoURL = video.snippet.videoLink || '';
    this.detectVideoType(this.videoURL);
    this.isCustomVideo = true;
    this.video$ = of(video);
  }

  handleCustomVideoNotFound(): void {
    if (this.isCustomVideo) {
      this.router.navigate(['/']);
      this.unsubscribe$.next();
    } else {
      this.isCustomVideo = false;
      this.loadVideoFromServer();
    }
  }

  loadVideoFromServer(): void {
    const sub = this.searchService
      .getVideoById(this.videoId)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((error) => {
          console.error('Ошибка при загрузке видео:', error);
          this.router.navigate(['/404']);
          return of(null);
        })
      )
      .subscribe((video) => {
        if (video) {
          const videoId =
            typeof video.id === 'string' ? video.id : video.id.videoId;
          this.videoURL = `https://www.youtube.com/embed/${videoId}`;
          this.video$ = of(video);
        }
      });

    this.subscriptions.add(sub);
  }

 detectVideoType(url: string): void {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp4':
        this.videoType = 'mp4';
        break;
      case 'webm':
        this.videoType = 'webm';
        break;
      case 'ogg':
        this.videoType = 'ogg';
        break;
      default:
        console.warn('Unsupported video type');
        this.videoType = '';
    }
  }
}
