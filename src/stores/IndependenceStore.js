'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {postOrPutStrategy} from '../resources/Requests';

class IndependenceStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      financialIndependence: {},
    };
  }

  reduce = (state, action) => {
    switch (action.action) {

    case ActionType.INDEPENDENCE.GETFORMSUCCESS:
      return {...state,
        financialIndependence: action.data,
      };

    case ActionType.INDEPENDENCE.SUBMIT:
      postOrPutStrategy(
        state.financialIndependence,
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.INDEPENDENCE.SUCCESS,
            data: data,
            state: action.state,
          });
        }
      );
      return {state};

    case ActionType.INDEPENDENCE.SUCCESS:
      return {...state, financialIndependence: action.data};

    case ActionType.RESETFORMSTORES:
      return {...state, financialIndependence: {}};

    default:
      return state;
    }
  }
}

export default new IndependenceStore();

