import { createSelector } from '@ngrx/store';
import { GlobalState } from './store.model';

// Селектор для получения всего состояния videos
export const selectState = (state: GlobalState) => state;

// Селектор для получения youtubeVideos
export const selectYoutubeVideos = createSelector(
  selectState,
  (state) => state.appState.videos.youtubeVideos.items
);

// Селектор для получения свойства isLoading из youtubeVideos
export const selectIsLoading = createSelector(selectState, (state) => {
  return state.appState.videos.youtubeVideos.isLoading;
});

export const selectError = createSelector(selectState, (state) => {
  return state.appState.videos.youtubeVideos.error;
});

/*
// Селектор для получения customVideos
export const selectCustomVideos = createSelector(
  selectVideosState,
  (videosState) => videosState.customVideos
);

// Селектор для получения favorites
export const selectFavoritesVideos = createSelector(
  selectVideosState,
  (videosState) => videosState.favorites
);

// Селектор для получения состояния page
export const selectPageState = (state: AppState) => state.page;
*/
