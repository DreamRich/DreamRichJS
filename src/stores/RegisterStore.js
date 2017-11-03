'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';

class RegisterStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ 
    return {
      financialPlanning: {}
    };
  }

  reduce = (state, action) => {
    let {financialPlanning} = state;
    switch (action.action) {

    case ActionType.CLIENT.GETFORMSUCCESS:
      financialPlanning.active_client_id = data.id
      return {...state, financialPlanning};

    case ActionType.REGISTER.STORE:
      return {...state, financialPlanning: action.data};

    default:
      return state;
    }
  }
}

export default new RegisterStore();
