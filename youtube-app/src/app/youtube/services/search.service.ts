import { Injectable } from '@angular/core';
import { MOCKDATA } from '../../../assets/images/mockdata';
import { Item } from '../models/search-item.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  getFoundedVideos(query: string): Item[] {
    const trimQuery = query.toLocaleLowerCase().trim();
    if (trimQuery) {
      return MOCKDATA.items.filter((item) =>
        item.snippet.title.toLocaleLowerCase().includes(trimQuery)
      );
    } else return [];
  }

  getVideoById(id: string): Item | undefined {
    const video: Item | undefined = MOCKDATA.items.find(
      (item) => item.id === id
    );
    if (video) {
      return video;
    } else {
      return undefined;
    }
  }
}
