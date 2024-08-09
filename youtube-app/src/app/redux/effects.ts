import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AppActions from './actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SearchService } from '../core/services/search.service';

@Injectable()
export class EffectsVideos {
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}

  getVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.getVideos),
      switchMap((action) =>
        this.searchService.getVideosWithStatistics(action.query).pipe(
          map((videos) => AppActions.getVideosSuccess({ videos })),
          catchError((error) =>
            of(AppActions.getVideosFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
