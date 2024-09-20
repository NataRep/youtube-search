import { Item, Statistics } from '../core/models/search-item.model';
import * as VideoActions from './actions';

describe('Video Actions', () => {
  let videos: Item[];
  let video: Item;

  beforeEach(() => {
    (video = {
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
    } as Item),
      (videos = [
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
      ]);
  });

  it('should create getVideos action', () => {
    const query = 'some query';
    const action = VideoActions.getVideos({ query });
    expect(action.type).toBe('[Videos] Get Videos');
    expect(action.query).toBe(query);
  });

  it('should create getVideosSuccess action', () => {
    const action = VideoActions.getVideosSuccess({ videos });
    expect(action.type).toBe('[Videos] Get Videos success');
    expect(action.videos).toEqual(videos);
  });

  it('should create getVideosFailure action', () => {
    const error = 'some error';
    const action = VideoActions.getVideosFailure({ error });
    expect(action.type).toBe('[Videos] Get Videos failure');
    expect(action.error).toBe(error);
  });

  it('should create addVideosToFavorites action', () => {
    const action = VideoActions.addVideosToFavorites({ video });
    expect(action.type).toBe('[Favorites] Add Video to Favorites');
    expect(action.video).toEqual(video);
  });

  it('should create removeVideosFromFavorites action', () => {
    const action = VideoActions.removeVideosFromFavorites({ video });
    expect(action.type).toBe('[Favorites] Remove Video from Favorites');
    expect(action.video).toEqual(video);
  });

  it('should create addCustomVideo action', () => {
    const action = VideoActions.addCustomVideo({ video });
    expect(action.type).toBe('[Custom Video] Add custom video');
    expect(action.video).toEqual(video);
  });

  it('should create removeCustomVideo action', () => {
    const action = VideoActions.removeCustomVideo({ video });
    expect(action.type).toBe('[Custom Video] Remove custom video');
    expect(action.video).toEqual(video);
  });
});
