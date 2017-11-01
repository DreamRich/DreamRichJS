'use strict';
import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import LoginStore from './LoginStore';

class AppStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ 
    return {
      navDrawerOpen: false,
      open: false,
      auth: false,
    };
  }

  reduce = (state, action) => {
    switch (action.action) {
    case ActionType.APP.SWITCHNAVDRAWER:
      return {...state, navDrawerOpen: !state.navDrawerOpen};

    case ActionType.APP.MENUTOGGLE:
      return {...state, open: !state.open};

    case ActionType.LOGIN.SUCCESS:
      AppDispatcher.waitFor([LoginStore.getDispatchToken()]);
      return {...state, auth: true};

    case ActionType.LOGOUT:
      AppDispatcher.waitFor([LoginStore.getDispatchToken()]);
      return {...state, auth: false};

    default:
      return state;
    }
  }
}

export default new AppStore();
