import { createAction, props } from '@ngrx/store';
import { Item } from '../core/models/search-item.model';

export const getVideos = createAction(
  '[Videos] Get Videos',
  props<{ query: string }>()
);

export const getVideosSuccess = createAction(
  '[Videos] Get Videos success',
  props<{ videos: Item[] }>()
);

export const getVideosFailure = createAction(
  '[Videos] Get Videos failure',
  props<{ error: string }>()
);

export const addVideosToFavorites = createAction(
  '[Favorites] Add Video to Favorites',
  props<{ video: Item }>()
);

export const removeVideosFromFavorites = createAction(
  '[Favorites] Remove Video from Favorites',
  props<{ video: Item }>()
);

export const addCustomVideo = createAction(
  '[Custom Video] Add custom video',
  props<{ video: Item }>()
);

export const removeCustomVideo = createAction(
  '[Custom Video] Remove custom video',
  props<{ video: Item }>()
);
