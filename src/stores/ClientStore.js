'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
//import {Auth} from '../auth/Auth';
import ActionType from '../actions/ActionType';

class ClientStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {}; }

  reduce = (state, action) => {
    switch (action.actionType) {
    case ActionType.CLIENT.ACTIVE:
      console.log(action.data);
      postData('/api/client/active/',
        action.data,
        (data) => {
          console.log(data);
        }
      );
      return state;
    default:
      console.log(action);
      return state;
    }
  }
}

export default new ClientStore();
