'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';

class LoginStorage extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {send: false, userExist: true}; }

  reduce = (state, action) => {
    switch (action.type) {
    case 'a':
      console.log(action, state);
      return state;
    default:
      console.log(action, state);
      return state;
    }
  }

}

export default new LoginStorage();
