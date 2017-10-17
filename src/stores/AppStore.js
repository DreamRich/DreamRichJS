'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {Auth} from '../auth/Auth';
import LoginStore from './LoginStore';
import ActionType from '../actions/ActionType';

class AppStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {auth: false}; }

  reduce = (state, action) => {
    switch (action.actionType) {
    case ActionType.LOGIN.SUCCESS:
      Auth.authenticate(action.data);
      return {auth: true};
    case ActionType.LOGOUT:
      AppDispatcher.waitFor([LoginStore.getDispatchToken()]);
      return {auth: false};
    default:
      return state;
    }
  }
}

export default new AppStore();
