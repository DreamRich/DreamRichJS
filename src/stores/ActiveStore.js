'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {getData, postData} from '../resources/Requests';
import {routeMap} from '../routes/RouteMap';

class ActiveStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ 
    return {types: [], id: undefined, actives_idx: [0], actives: [], idx:1,
      profit: 0,
      profit_real: 0,
      sugest: 0,
      difference: 0,
      total: 0,
      total_atual: 0,
      total_sugest: 0,
      total_difference: 0,
    };
  }

  reduce = (state, action) => {
    let actives;
    switch (action.actionType) {
    case ActionType.ACTIVE.MANAGER:
      postData(routeMap.active_manager,
        action.data,
        (data) => AppDispatcher.dispatch({
          actionType: ActionType.ACTIVE.SUCCESS,
          id: data.id,
          actives: data.actives,
        })
      );
      return state;

    case ActionType.ACTIVE.GETMANAGER:
      getData(`${routeMap.active_manager}${action.id}/`,
        (data) => AppDispatcher.dispatch({
          actionType: ActionType.ACTIVE.SUCCESS,
          actives: data.actives})
      );
      return state;

    case ActionType.ACTIVE.FORM:
      postData(routeMap.active,
        action.data);
      return {...state, submit: false};

    case ActionType.ACTIVE.SUCCESS:
      return {...state, id: action.id, actives: action.actives};

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

    case ActionType.ACTIVE.ADD:
      actives = state.actives.slice();
      actives.push(state.idx);
      return {...state, actives, idx: state.idx+1};

    case ActionType.ACTIVE.REMOVE:
      actives = state.actives.filter(id=> id !== action.id);
      return {...state, actives};

    default:
      return state;
    }
  }
}

export default new ActiveStore();
