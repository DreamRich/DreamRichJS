'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
import ActionType from '../actions/ActionType';
import {routeMap} from '../routes/RouteMap';

class PatrimonyStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      id: undefined
    };
  }

  reduce = (state, action) => {
    switch (action.actionType) {
    case ActionType.ACTIVE.FORM:
      postData(
        routeMap.active,
        action.data,
        (data) => {
          AppDispatcher.dispatch({actionType: ActionType.PATRIMONY.SUCCESS,
            id: data.id});
        }
      );
      return state;

    case ActionType.PATRIMONY.SUBFORM:
      postData(
        action.route,
        action.data
      );
      return state;

    case ActionType.PATRIMONY.SUCCESS:
      return {...state, id: action.id};

    default:
      return state;
    }
  }
}

export default new PatrimonyStore();
