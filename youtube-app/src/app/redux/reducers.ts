import { createReducer, on } from '@ngrx/store';
import { AppState, Page, VideosState } from './store.model';
import * as AppActions from './actions';

//начальное состояние Store приложения
export const initialVideosState: VideosState = {
  customVideos: [],
  youtubeVideos: {
    isLoading: false,
    items: [],
    error: null,
  },
  favorites: [],
};

export const page: Page = {
  number: 0,
  prev: null,
  next: null,
};

export const initialState: AppState = {
  videos: initialVideosState,
  page: page,
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
  )
);
