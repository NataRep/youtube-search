import { Injectable } from '@angular/core';
import { Item, Statistics } from '../models/search-item.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, mergeMap, switchMap, toArray } from 'rxjs/operators';
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
        .set('order', 'rating')
        .set('maxResults', maxResults.toString());

      return this.http
        .get<{ items: Item[] }>(this.baseURL + '/search', { params })
        .pipe(map((response) => response.items));
    } else {
      return of([]);
    }
  }

  getVideoStatistics(videoId: string): Observable<Statistics> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('id', videoId)
      .set('part', 'statistics');
    return this.http
      .get<{ items: { statistics: Statistics }[] }>(`${this.baseURL}/videos`, {
        params,
      })
      .pipe(
        map((response) => {
          if (response.items && response.items.length > 0) {
            return response.items[0].statistics;
          } else {
            throw new Error('No statistics found');
          }
        })
      );
  }

  getVideosWithStatistics(
    query: string,
    maxResults: number = 12
  ): Observable<Item[]> {
    return this.getFoundedVideos(query, maxResults).pipe(
      switchMap((videos) =>
        videos.length
          ? of(...videos).pipe(
              mergeMap((video: Item) => {
                // Проверяем, является ли id объектом и извлекаем videoId
                const videoId =
                  typeof video.id === 'string' ? video.id : video.id.videoId;

                return this.getVideoStatistics(videoId).pipe(
                  map((stats) => ({
                    ...video,
                    statistics: stats,
                  }))
                );
              }),
              toArray()
            )
          : of([])
      )
    );
  }

  getVideoById(id: string): Observable<Item> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('id', id)
      .set('part', 'statistics, snippet');

    return this.http
      .get<{ items: Item[] }>(`${this.baseURL}/videos`, {
        params,
      })
      .pipe(
        map((response) => {
          if (response.items && response.items.length > 0) {
            return response.items[0];
          } else {
            throw new Error('Video not found');
          }
        })
      );
  }
}
