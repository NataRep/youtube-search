import { Item } from '../core/models/search-item.model';

export interface GlobalState {
  appState: AppState;
}

export interface AppState {
  videos: VideosState;
  page: PageState;
  //TODO: auth - перенести состояние авторизации сюда
}

export interface VideosState {
  customVideos: Item[];
  youtubeVideos: YoutubeVideosState;
  favorites: Item[];
}
export interface PageState {
  number: number;
  prev: string | null;
  next: string | null;
}

export interface YoutubeVideosState {
  isLoading: boolean;
  items: Item[];
  error: string | null;
}
