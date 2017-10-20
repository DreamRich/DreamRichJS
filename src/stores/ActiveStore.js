'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {getData} from '../resources/Requests';
import {routeMap} from '../routes/RouteMap';

class ActiveStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {id: undefined, types: []}; }

  reduce = (state, action) => {
    switch (action.actionType) {
    case ActionType.ACTIVE.TYPE:
      getData(routeMap.active_type,
        (data) => AppDispatcher.dispatch({
          actionType: ActionType.ACTIVE.TYPESUCCESS,
          types: data
        })
      );
      return state;

    case ActionType.ACTIVE.TYPESUCCESS:
      return {...state, types: action.types};

    default:
      return state;
    }
  }
}

export default new ActiveStore();
