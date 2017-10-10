'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';

class FixedCostStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {costs: [0], idx: 1}; }

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
    default:
      console.log(action);
      return state;
    }
  }
}

export default new FixedCostStore();
