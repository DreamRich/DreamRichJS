'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
import ActionType from '../actions/ActionType';

class PasswordStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {send: false}; }

  reduce = (state, action) => {
    switch (action.actionType) {
    case 'password/change':
      console.log(state, action);
      postData('/api/auth/password/',
        action.data,
        (data) => {
          AppDispatcher.dispatch({actionType: ActionType.PASSWORD.SUCCESS,
            data: data});
        },
        () => {
          AppDispatcher.dispatch({actionType: ActionType.PASSWORD.FAIL});
        }
        );
      return {send: true};

    case ActionType.PASSWORD.RESET:
      return {userExist: false};

    case ActionType.PASSWORD.FAIL:
      return {send: false};

    case ActionType.PASSWORD.SUCCESS:
      return {send: false};

    default:
      console.log(action);
      return state;
    }
  }
}

export default new PasswordStore();
