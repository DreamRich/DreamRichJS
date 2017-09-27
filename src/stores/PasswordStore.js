'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
//import ActionType from '../actions/ActionType';

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
          AppDispatcher.dispatch({actionType: 'password/success',
            data: data});
        },
        () => {
          AppDispatcher.dispatch({actionType: 'password/fail'});
        }
        );
      return {send: true};

    case 'password/reset':
      return {userExist: false};

    default:
      console.log(action);
      return state;
    }
  }
}

export default new PasswordStore();
