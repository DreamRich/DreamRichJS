'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
import {Auth} from '../auth/Auth';

class LoginStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {userExist: true}; }

  reduce = (state, action) => {
    switch (action.actionType) {
    case 'login/post':
      console.log(state, action);
      postData('/api/auth/',
        action.data,
        Auth.authenticate,
        () => {
          AppDispatcher.dispatch({actionType: 'login/fail'});
        }
        );
      return state;

    case 'login/fail':
      return {userExist: false};

    case 'logout':
      Auth.deauthenticate();
      return state;
    default:
      console.log(action);
      return state;
    }
  }
}

export default new LoginStore();
