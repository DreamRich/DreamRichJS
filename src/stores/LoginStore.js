'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
import {Auth} from '../auth/Auth';
import ActionType from '../actions/ActionType';

class LoginStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {userExist: true}; }

  reduce = (state, action) => {
    switch (action.actionType) {
    case ActionType.LOGIN.POST:
      console.log(state, action);
      postData('/api/auth/',
        action.data,
        (data) => {
          AppDispatcher.dispatch({actionType: ActionType.LOGIN.SUCCESS,
            data: data});
        },
        () => {
          AppDispatcher.dispatch({actionType: ActionType.LOGIN.FAIL});
        }
      );
      return state;

    case ActionType.LOGIN.FAIL:
      return {userExist: false};

    case ActionType.LOGOUT:
      Auth.deauthenticate();
      return state;

    case ActionType.REFRESH_LOGIN:
      postData('/api/auth/refresh/',
        action.data,
        (data) => {
          AppDispatcher.dispatch({actionType: ActionType.LOGIN.SUCCESS,
            data: data});
        },
        () => {
          alert('Fail when try refresh token\nLogouting');
          AppDispatcher.dispatch({actionType: ActionType.LOGOUT});
        }
      );
      return state;
    default:
      console.log(action);
      return state;
    }
  }
}

export default new LoginStore();
