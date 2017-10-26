'use strict';
import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';

class AppStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {navDrawerOpen: false, open: false}; }

  reduce = (state, action) => {
    switch (action.actionType) {
    case ActionType.APP.SWITCHNAVDRAWER:
      return {...state, navDrawerOpen: !state.navDrawerOpen};

    case ActionType.APP.MENUTOGGLE:
      return {...state, open: !state.open};
    default:
      return state;
    }
  }
}

export default new AppStore();
