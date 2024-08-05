import { createSelector } from '@ngrx/store';
import { AppState } from './store.model';

export const selectAllVideos = (state: AppState) => state.videos;

export const selectIsLoading = createSelector(
  selectAllVideos,
  (state) => state.youtubeVideos.isLoading
);

export const selectYoutubeVideos = createSelector(
  selectAllVideos,
  (state) => state.youtubeVideos.isLoading
);

export const selectCustomVideos = createSelector(
  selectAllVideos,
  (state) => state.customVideos
);

export const selectFavoritesVideos = createSelector(
  selectAllVideos,
  (state) => state.favorites
);
