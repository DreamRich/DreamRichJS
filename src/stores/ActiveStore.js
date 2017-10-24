'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {getData, postData} from '../resources/Requests';
import {routeMap} from '../routes/RouteMap';

class ActiveStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ 
    return {types: [], id: undefined, actives: [0], idx:1};
  }

  reduce = (state, action) => {
    let actives;
    switch (action.actionType) {
    case ActionType.ACTIVE.MANAGER:
      postData(routeMap.active_manager,
        action.data,
        (data) => AppDispatcher.dispatch({
          id: data.id,
          actionType: ActionType.ACTIVE.SUCCESS
        })
      );
      return state;

    case ActionType.ACTIVE.FORM:
      postData(routeMap.active,
        action.data);
      return {...state, submit: false};

    case ActionType.ACTIVE.SUCCESS:
      return {...state, id: action.id};

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

    case ActionType.ACTIVE.PROFIT:
      var profit = {...state.profit, ...action.data};
      return {...state, profit, totalProfit: this.calculate(profit)};

    case ActionType.ACTIVE.DELETEPROFIT:
      delete state.profit[action.index];
      return {...state, totalProfit: this.calculate(profit)};

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
  calculate = (profit) =>{
    let sum = 0;
    for(var key in profit){
      if( profit.hasOwnProperty(key) ){
        sum+=Number(profit[key].value);
      }
    }
    return sum;
  }
}

export default new ActiveStore();
