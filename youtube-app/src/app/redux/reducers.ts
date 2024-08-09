import { createReducer, on } from '@ngrx/store';
import { AppState, PageState, VideosState } from './store.model';
import * as AppActions from './actions';

// Начальное состояние Store приложения
export const initialVideosState: VideosState = {
  customVideos: [],
  youtubeVideos: {
    isLoading: false,
    items: [],
    error: null,
  },
  favorites: [],
};

export const initialPageState: PageState = {
  number: 0,
  prev: null,
  next: null,
};

export const initialState: AppState = {
  videos: initialVideosState,
  page: initialPageState,
};

export const reducers = createReducer(
  initialState,
  on(
    AppActions.getVideos,
    (state): AppState => ({
      ...state,
      videos: {
        ...state.videos,
        youtubeVideos: {
          ...state.videos.youtubeVideos,
          isLoading: true,
          error: null,
        },
      },
    })
  ),

  on(
    AppActions.getVideosSuccess,
    (state, action): AppState => ({
      ...state,
      videos: {
        ...state.videos,
        youtubeVideos: {
          ...state.videos.youtubeVideos,
          items: action.videos,
          isLoading: false,
          error: null,
        },
      },
    })
  ),

  on(
    AppActions.getVideosFailure,
    (state, action): AppState => ({
      ...state,
      videos: {
        ...state.videos,
        youtubeVideos: {
          ...state.videos.youtubeVideos,
          isLoading: false,
          error: action.error,
        },
      },
    })
  ),

  on(AppActions.addVideosToFavorites, (state, action): AppState => {
    const newFavorites = [...state.videos.favorites, action.video];

    return {
      ...state,
      videos: {
        ...state.videos,
        favorites: newFavorites,
      },
    };
  }),

  on(AppActions.removeVideosFromFavorites, (state, action): AppState => {
    const newFavorites = state.videos.favorites.filter(
      (item) => item.id !== action.video.id
    );
    return {
      ...state,
      videos: {
        ...state.videos,
        favorites: newFavorites,
      },
    };
  }),

  on(AppActions.addCustomVideo, (state, action): AppState => {
    const newCustoms = [...state.videos.customVideos, action.video];

    return {
      ...state,
      videos: {
        ...state.videos,
        customVideos: newCustoms,
      },
    };
  }),

  on(AppActions.removeCustomVideo, (state, action): AppState => {
    const newCustoms = state.videos.customVideos.filter(
      (item) => item.id !== action.video.id
    );
    return {
      ...state,
      videos: {
        ...state.videos,
        customVideos: newCustoms,
      },
    };
  })
);
