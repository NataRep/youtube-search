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
  apiKey: string = environment.apiKey;
  queryAttempts: number = 0;

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

      return this.http.get<{ items: Item[] }>('/search', { params }).pipe(
        map((response) => {
          this.queryAttempts = 0;
          return response.items;
        })
      );
    } else {
      return of([]);
    }
  }

  getVideosStatistics(
    videosId: string[]
  ): Observable<{ id: string; statistics: Statistics }[]> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('id', videosId.join(','))
      .set('part', 'statistics');
    return this.http
      .get<{ items: { id: string; statistics: Statistics }[] }>(`/videos`, {
        params,
      })
      .pipe(
        map((response) => {
          if (response.items && response.items.length > 0) {
            return response.items.map((item) => ({
              id: item.id,
              statistics: item.statistics,
            }));
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
      switchMap((videos) => {
        if (!videos.length) {
          return of([]);
        }

        const videoIds = videos.map((video: Item) =>
          typeof video.id === 'string' ? video.id : video.id.videoId
        );

        return this.getVideosStatistics(videoIds).pipe(
          map((statsList) => {
            // Создаем объект для быстрого поиска статистики по id
            const statsMap = statsList.reduce((acc, stats) => {
              acc[stats.id] = stats.statistics;
              return acc;
            }, {} as { [key: string]: Statistics });

            return videos.map((video: Item) => {
              const videoId =
                typeof video.id === 'string' ? video.id : video.id.videoId;
              return {
                ...video,
                statistics: statsMap[videoId] || {},
              };
            });
          })
        );
      })
    );
  }

  getVideoById(id: string): Observable<Item> {
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('id', id)
      .set('part', 'statistics, snippet');

    return this.http
      .get<{ items: Item[] }>(`/videos`, {
        params,
      })
      .pipe(
        map((response) => {
          if (response.items && response.items.length > 0) {
            this.queryAttempts = 0;
            return response.items[0];
          } else {
            throw new Error('Video not found');
          }
        })
      );
  }
}
