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
