import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { EffectsVideos } from './effects';
import { of, throwError } from 'rxjs';
import { SearchService } from '../core/services/search.service';
import * as AppActions from './actions';
import { hot, cold } from 'jest-marbles';
import { Item, Statistics } from '../core/models/search-item.model';

describe('EffectsVideos', () => {
  let effects: EffectsVideos;
  let searchService: jest.Mocked<SearchService>;
  let videos: Item[];

  beforeEach(() => {
    searchService = {
      getVideosWithStatistics: jest.fn(),
    } as unknown as jest.Mocked<SearchService>;

    videos = [
      {
        id: '1Dlf2LGL3',
        snippet: {
          publishedAt: '2021-08-01T00:00:00Z',
          title: 'A very long video title that should be trimmed by the pipe',
          description: 'Test video description',
          thumbnails: { medium: { url: 'test-url', width: 120, height: 90 } },
          tags: ['test'],
        },
        statistics: {
          viewCount: '1000',
          likeCount: '100',
          favoriteCount: '10',
          commentCount: '5',
        } as Statistics,
      } as Item,
      {
        id: '2Dlf2LGL3',
        snippet: {
          publishedAt: '2021-08-01T00:00:00Z',
          title: 'A very long video title that should be trimmed by the pipe',
          description: 'Test video description',
          thumbnails: { medium: { url: 'test-url', width: 120, height: 90 } },
          tags: ['test'],
        },
        statistics: {
          viewCount: '1000',
          likeCount: '100',
          favoriteCount: '10',
          commentCount: '5',
        } as Statistics,
      } as Item,
      {
        id: '3Dlf2LGL3',
        snippet: {
          publishedAt: '2021-08-01T00:00:00Z',
          title: 'A very long video title that should be trimmed by the pipe',
          description: 'Test video description',
          thumbnails: { medium: { url: 'test-url', width: 120, height: 90 } },
          tags: ['test'],
        },
        statistics: {
          viewCount: '1000',
          likeCount: '100',
          favoriteCount: '10',
          commentCount: '5',
        } as Statistics,
      } as Item,
    ];

    TestBed.configureTestingModule({
      providers: [
        EffectsVideos,
        { provide: SearchService, useValue: searchService },
        {
          provide: Actions,
          useValue: hot('-a-|', { a: AppActions.getVideos({ query: 'test' }) }),
        },
      ],
    });

    effects = TestBed.inject(EffectsVideos);
  });

  it('should return a getVideosSuccess action with the videos on success', () => {
    searchService.getVideosWithStatistics.mockReturnValue(of(videos));

    const outcome = AppActions.getVideosSuccess({ videos });

    expect(effects.getVideos$).toBeObservable(cold('-b-|', { b: outcome }));
  });

  it('should return a getVideosFailure action with the error on failure', () => {
    const error = 'error message';
    const outcome = AppActions.getVideosFailure({ error });

    searchService.getVideosWithStatistics.mockReturnValue(
      throwError(() => new Error(error))
    );

    expect(effects.getVideos$).toBeObservable(cold('-b-|', { b: outcome }));
  });
});
