import { createSelector } from '@ngrx/store';
import { GlobalState } from './store.model';
import { CardCreationFormComponent } from '../youtube/components/card-creation-form/card-creation-form.component';

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

// Селектор для получения favorites
export const selectFavoritesVideos = createSelector(
  selectState,
  (state) => state.appState.videos.favorites
);

// Селектор для получения customVideos
export const selectCustomVideos = createSelector(
  selectState,
  (state) => state.appState.videos.customVideos
);

export const selectCustomAndYoutubeVideo = createSelector(
  selectState,
  (state) => [
    ...state.appState.videos.customVideos,
    ...state.appState.videos.youtubeVideos.items,
  ]
);

/*
// Селектор для получения состояния page
export const selectPageState = (state: AppState) => state.page;
*/
