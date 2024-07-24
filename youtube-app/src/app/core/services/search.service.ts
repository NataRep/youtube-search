import { Injectable } from '@angular/core';
import { MOCKDATA } from '../../../assets/images/mockdata';
import { Item } from '../models/search-item.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  baseURL: string = '/youtube-api';
  apiKey: string = environment.apiKey;
  constructor(private http: HttpClient) {}

  getFoundedVideos(query: string, maxResults: number = 12): Observable<Item[]> {
    const trimQuery = query.toLocaleLowerCase().trim();
    if (trimQuery) {
      const params = new HttpParams()
        .set('key', this.apiKey)
        .set('q', query)
        .set('part', 'snippet')
        .set('type', 'video')
        .set('maxResults', maxResults.toString());

      return this.http
        .get<{ items: Item[] }>(this.baseURL + '/search', { params })
        .pipe(map((response) => response.items));
    } else {
      return of([]);
    }
  }

  getVideoById(id: string): Item | undefined {
    return MOCKDATA.items.find((item) => item.id === id);
  }
}
