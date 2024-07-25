import { Injectable } from '@angular/core';
import { Item, Statistics } from '../models/search-item.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  baseURL: string = '/youtube-api';
  apiKey: string = environment.apiKey;
  queryAttempts: number = 0;

  constructor(private http: HttpClient) {}

  private handleError403<T>(
    error: HttpErrorResponse,
    retryCallback: () => Observable<T>
  ): Observable<T> {
    // Этот обработчик ошибки проверяет была превышена квота запросов по ключу,
    // и меняю ключ на альтернативный
    if (error.status === 403 && this.queryAttempts < 1) {
      this.queryAttempts += 1;
      this.apiKey =
        this.apiKey === environment.apiKey
          ? environment.apiKeyAlternative
          : environment.apiKey;
      return retryCallback();
    } else {
      console.error('Ошибка при запросе:', error);
      return throwError(() => error);
    }
  }

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
        .pipe(
          map((response) => {
            this.queryAttempts = 0;
            return response.items;
          }),
          catchError((error) =>
            this.handleError403(error, () =>
              this.getFoundedVideos(query, maxResults)
            )
          )
        );
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
            this.queryAttempts = 0;
            return response.items[0].statistics;
          } else {
            throw new Error('No statistics found');
          }
        }),
        catchError((error) =>
          this.handleError403(error, () => this.getVideoStatistics(videoId))
        )
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
            this.queryAttempts = 0;
            return response.items[0];
          } else {
            throw new Error('Video not found');
          }
        }),
        catchError((error) =>
          this.handleError403(error, () => this.getVideoById(id))
        )
      );
  }
}
