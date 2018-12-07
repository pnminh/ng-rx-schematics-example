import { Action } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';

export interface State {
  userName?: string;
}

export const initialState: State = {
  userName: null
};

export function reducer(
  state = initialState,
  action: authActions.AuthActions
): State {
  switch (action.type) {
    case authActions.AuthActionTypes.SetAuths:
      return handleSetAuths(state, action);
    default:
      return state;
  }
}
function handleSetAuths(state: State, action: authActions.SetAuths): State {
  return {
    ...state,
    userName: action.payload
  };
}
