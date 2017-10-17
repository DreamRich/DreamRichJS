'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {postData, getData} from '../resources/Requests';

class FixedCostStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      costs: [0],
      idx: 1,
      id: undefined,
      types: []
    };
  }

  reduce = (state, action) => {
    let new_array;
    switch (action.actionType) {
    case ActionType.FIXEDCOST.ADD:
      new_array = state.costs.slice();
      new_array.push(state.idx);
      return {...state, costs: new_array, idx: state.idx + 1};

    case ActionType.FIXEDCOST.REMOVE:
      new_array = state.costs.slice();
      return {...state,
        costs: new_array.filter( element => element !== action.key )
      };

    case ActionType.FIXEDCOST.MANAGER:
      postData('/api/financial_planning/costmanager/',{},
        (data) => AppDispatcher.dispatch({
          actionType: ActionType.FIXEDCOST.SUCCESS,
          id: data.id
        })
      );
      return state;

    case ActionType.FIXEDCOST.SUCCESS:
      return {...state, id: action.id};

    case ActionType.FIXEDCOST.TYPE:
      getData('/api/financial_planning/costtype/',
        (data) => AppDispatcher.dispatch({
          actionType: ActionType.FIXEDCOST.TYPESUCCESS,
          types: data
        })
      );
      return state;

    case ActionType.FIXEDCOST.TYPESUCCESS:
      return {...state, types: action.types};

    default:
      return state;
    }
  }
}

export default new FixedCostStore();
