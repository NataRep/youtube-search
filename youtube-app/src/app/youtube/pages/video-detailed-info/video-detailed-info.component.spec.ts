import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { VideoDetailedInfoComponent } from './video-detailed-info.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Item, Statistics } from '../../../core/models/search-item.model';
import { selectCustomVideoById } from '../../../redux/selectors';
import { of, throwError } from 'rxjs';
import { SearchService } from '../../../core/services/search.service';

describe('VideoDetailedInfoComponent', () => {
  let component: VideoDetailedInfoComponent;
  let fixture: ComponentFixture<VideoDetailedInfoComponent>;
  let store: MockStore;
  let router: Router;
  let location: Location;
  let searchService: SearchService;

  const mockVideo = {
    id: '1Dlf2LGL3',
    snippet: {
      publishedAt: '2021-08-01T00:00:00Z',
      title: 'A very long video title that should be trimmed by the pipe',
      description: 'Test video description',
      thumbnails: { medium: { url: 'test-url', width: 120, height: 90 } },
      tags: ['test'],
      videoLink: 'http://example.com/video.mp4',
    },
    statistics: {
      viewCount: '1000',
      likeCount: '100',
      favoriteCount: '10',
      commentCount: '5',
    } as Statistics,
  } as Item;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VideoDetailedInfoComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [Location, provideMockStore({}), SearchService],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoDetailedInfoComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    searchService = TestBed.inject(SearchService);

    fixture.detectChanges();

    // Mock the store select method
    jest.spyOn(store, 'select').mockImplementation((selector) => {
      if (selector === selectCustomVideoById(component.videoId)) {
        return of(mockVideo); // You can adjust this depending on the test
      }
      return of(null);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Tests for goBack method

  it('should navigate back if referrer is from the same host', () => {
    const referrerSpy = jest
      .spyOn(document, 'referrer', 'get')
      .mockReturnValue('http://localhost/some-path');
    const locationBackSpy = jest.spyOn(location, 'back');

    component.goBack();

    expect(locationBackSpy).toHaveBeenCalled();

    referrerSpy.mockRestore();
  });

  it('should navigate to the home page if referrer is from a different host', () => {
    const referrerSpy = jest
      .spyOn(document, 'referrer', 'get')
      .mockReturnValue('http://different-host/some-path');
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.goBack();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);

    referrerSpy.mockRestore();
  });

  it('should navigate to the home page if there is no referrer', () => {
    const referrerSpy = jest
      .spyOn(document, 'referrer', 'get')
      .mockReturnValue('');
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.goBack();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);

    referrerSpy.mockRestore();
  });

  // Tests for handleCustomVideoFound method

  it('should call handleCustomVideoFound if video is found in the state', () => {
    jest.spyOn(store, 'select').mockReturnValue(of(mockVideo));
    const handleCustomVideoFoundSpy = jest.spyOn(
      component,
      'handleCustomVideoFound'
    );

    component.checkVideoInState();

    expect(handleCustomVideoFoundSpy).toHaveBeenCalledWith(mockVideo);
  });

  it('should call handleCustomVideoNotFound if video is not found in the state', () => {
    jest.spyOn(store, 'select').mockReturnValue(of(null));
    const handleCustomVideoNotFoundSpy = jest.spyOn(
      component,
      'handleCustomVideoNotFound'
    );

    component.checkVideoInState();

    expect(handleCustomVideoNotFoundSpy).toHaveBeenCalled();
  });

  // Tests for handleCustomVideoFound method

  it('should correctly set videoURL, detect video type, and set isCustomVideo to true', () => {
    component.handleCustomVideoFound(mockVideo);

    expect(component.videoURL).toBe(mockVideo.snippet.videoLink);

    expect(component.videoType).toBe('mp4');

    expect(component.isCustomVideo).toBe(true);

    component.video$.subscribe((video) => {
      expect(video).toBe(mockVideo);
    });
  });

  // Tests for handleCustomVideoNotFound method

  it('should navigate to the home page if isCustomVideo is true', () => {
    component.isCustomVideo = true;
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.handleCustomVideoNotFound();

    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should call loadVideoFromServer if isCustomVideo is false', () => {
    component.isCustomVideo = false;
    const loadVideoFromServerSpy = jest.spyOn(component, 'loadVideoFromServer');

    component.handleCustomVideoNotFound();

    expect(loadVideoFromServerSpy).toHaveBeenCalled();
  });

  // Tests for loadVideoFromServer method

  it('should call SearchService.getVideoById and set videoURL correctly on success', () => {
    jest.spyOn(searchService, 'getVideoById').mockReturnValue(of(mockVideo));
    const videoId = '1Dlf2LGL3';
    component.videoId = videoId;
    component.isCustomVideo = false;

    component.loadVideoFromServer();

    expect(searchService.getVideoById).toHaveBeenCalledWith(videoId);

    component.video$.subscribe((video) => {
      expect(video).toBe(mockVideo);
      expect(component.videoURL).toBe(
        `https://www.youtube.com/embed/${videoId}`
      );
    });
  });

  it('should navigate to 404 page on error from SearchService.getVideoById', () => {
    jest
      .spyOn(searchService, 'getVideoById')
      .mockReturnValue(throwError(() => new Error('Error')));
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.videoId = '1Dlf2LGL3';
    component.isCustomVideo = false;

    component.loadVideoFromServer();

    expect(searchService.getVideoById).toHaveBeenCalledWith(component.videoId);
    expect(navigateSpy).toHaveBeenCalledWith(['/404']);
  });

  // Tests for detectVideoType method

  it('should correctly identify mp4 video type', () => {
    component.detectVideoType('http://example.com/video.mp4');
    expect(component.videoType).toBe('mp4');
  });

  it('should correctly identify webm video type', () => {
    component.detectVideoType('http://example.com/video.webm');
    expect(component.videoType).toBe('webm');
  });

  it('should correctly identify ogg video type', () => {
    component.detectVideoType('http://example.com/video.ogg');
    expect(component.videoType).toBe('ogg');
  });

  it('should correctly identify avi video type', () => {
    component.detectVideoType('http://example.com/video.avi');
    expect(component.videoType).toBe('avi');
  });

  it('should set videoType to empty string for unsupported video types', () => {
    component.detectVideoType('http://example.com/video.unknowntype');
    expect(component.videoType).toBe('');
  });
});
