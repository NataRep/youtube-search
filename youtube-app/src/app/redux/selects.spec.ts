import {
  selectState,
  selectYoutubeVideos,
  selectIsLoading,
  selectError,
  selectFavoritesVideos,
  selectCustomVideos,
  selectCustomAndYoutubeVideo,
  selectCustomVideoById,
} from './selectors';
import { GlobalState } from './store.model';

describe('Selectors', () => {
  let initialState: GlobalState;

  beforeEach(() => {
    initialState = {
      appState: {
        videos: {
          youtubeVideos: {
            items: [
              {
                id: '1',
                kind: 'video',
                snippet: {
                  publishedAt: '2021-08-01T00:00:00Z',
                  title: 'Title',
                  description: 'Test video description',
                  thumbnails: {
                    medium: { url: 'test-url', width: 120, height: 90 },
                  },
                  tags: ['test'],
                },
                statistics: {
                  viewCount: '1000',
                  likeCount: '100',
                  favoriteCount: '10',
                  commentCount: '5',
                },
              },
              {
                id: '2',
                kind: 'video',
                snippet: {
                  publishedAt: '2021-08-01T00:00:00Z',
                  title: 'Title',
                  description: 'Test video description',
                  thumbnails: {
                    medium: { url: 'test-url', width: 120, height: 90 },
                  },
                  tags: ['test'],
                },
                statistics: {
                  viewCount: '1000',
                  likeCount: '100',
                  favoriteCount: '10',
                  commentCount: '5',
                },
              },
            ],
            isLoading: false,
            error: null,
          },
          favorites: [
            {
              id: '3',
              kind: 'video',
              snippet: {
                publishedAt: '2021-08-01T00:00:00Z',
                title: 'Title',
                description: 'Test video description',
                thumbnails: {
                  medium: { url: 'test-url', width: 120, height: 90 },
                },
                tags: ['test'],
              },
              statistics: {
                viewCount: '1000',
                likeCount: '100',
                favoriteCount: '10',
                commentCount: '5',
              },
            },
            {
              id: '4',
              kind: 'video',
              snippet: {
                publishedAt: '2021-08-01T00:00:00Z',
                title: 'Title',
                description: 'Test video description',
                thumbnails: {
                  medium: { url: 'test-url', width: 120, height: 90 },
                },
                tags: ['test'],
              },
              statistics: {
                viewCount: '1000',
                likeCount: '100',
                favoriteCount: '10',
                commentCount: '5',
              },
            },
          ],
          customVideos: [
            {
              id: '5',
              kind: 'Custom Video',
              snippet: {
                publishedAt: '2021-08-01T00:00:00Z',
                title: 'Title',
                description: 'Test video description',
                thumbnails: {
                  medium: { url: 'test-url', width: 120, height: 90 },
                },
                tags: ['test'],
              },
              statistics: {
                viewCount: '1000',
                likeCount: '100',
                favoriteCount: '10',
                commentCount: '5',
              },
            },
          ],
        },
      },
    };
  });

  it('should select the entire state', () => {
    const result = selectState(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select youtube videos', () => {
    const result = selectYoutubeVideos.projector(initialState);
    expect(result).toEqual(initialState.appState.videos.youtubeVideos.items);
  });

  it('should select the isLoading state', () => {
    const result = selectIsLoading.projector(initialState);
    expect(result).toBe(false);
  });

  it('should select the error state', () => {
    const result = selectError.projector(initialState);
    expect(result).toBeNull();
  });

  it('should select favorite videos', () => {
    const result = selectFavoritesVideos.projector(initialState);
    expect(result).toEqual(initialState.appState.videos.favorites);
  });

  it('should select custom videos', () => {
    const result = selectCustomVideos.projector(initialState);
    expect(result).toEqual(initialState.appState.videos.customVideos);
  });

  it('should select custom and youtube videos combined', () => {
    const result = selectCustomAndYoutubeVideo.projector(initialState);
    const expectedVideos = [
      ...initialState.appState.videos.customVideos,
      ...initialState.appState.videos.youtubeVideos.items,
    ];
    expect(result).toEqual(expectedVideos);
  });

  it('should select a custom video by ID', () => {
    const result = selectCustomVideoById('5').projector(initialState);
    expect(result).toEqual({
      id: '5',
      kind: 'Custom Video',
      snippet: {
        publishedAt: '2021-08-01T00:00:00Z',
        title: 'Title',
        description: 'Test video description',
        thumbnails: {
          medium: { url: 'test-url', width: 120, height: 90 },
        },
        tags: ['test'],
      },
      statistics: {
        viewCount: '1000',
        likeCount: '100',
        favoriteCount: '10',
        commentCount: '5',
      },
    });
  });

  it('should return undefined if custom video ID is not found', () => {
    const result = selectCustomVideoById('not-found').projector(initialState);
    expect(result).toBeUndefined();
  });
});
