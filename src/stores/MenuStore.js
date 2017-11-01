'use strict';

import {ReduceStore} from 'flux/utils';
// import {Auth} from '../auth/Auth';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';

class MenuStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {openMenu: false}; }

  reduce = (state, action) => {
    switch (action.action) {
    case ActionType.MENU.REQUESTCHANGE:
      return {...state, openMenu: action.openMenu};

    default:
      return state;
    }
  }
}

export default new MenuStore();
