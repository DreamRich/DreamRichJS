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
      id: undefined,
      patrimony: {},
    };
  }

  reduce = (state, action) => {
    switch (action.action) {

    case ActionType.PATRIMONY.GETFORMSUCCESS:
      return {...state, patrimony: action.data};

    case ActionType.PATRIMONY.FORM:
      postData(
        routeMap.patrimony,
        action.data,
        (data) => {
          AppDispatcher.dispatch({action: ActionType.PATRIMONY.SUCCESS,
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

    case ActionType.RESETFORMSTORES:
      return {...state, patrimony: {}};

    default:
      return state;
    }
  }
}

export default new PatrimonyStore();
