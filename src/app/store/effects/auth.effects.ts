import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/operators';

import * as authActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}
  @Effect()
  public loadAuths$ = this.actions$.pipe(
    ofType(authActions.AuthActionTypes.LoadAuths),
    switchMap(() => {
      return this.http
        .get<string>('login')
        .pipe(map(username => new authActions.SetAuths(username)));
    })
  );
}
