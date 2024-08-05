import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AppActions from './actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
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
      mergeMap((action) =>
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
