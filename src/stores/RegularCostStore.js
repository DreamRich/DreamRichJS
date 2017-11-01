'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {getData, postOrPutStrategy} from '../resources/Requests';
import getLastIndex from '../utils/getLastIndex';
import {/*getUrl, */routeMap} from '../routes/RouteMap';

class RegularCostStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      costs: [{index: 0}],
      regularCostManager: {},
      types: [],
      canSubmit: false,
    };
  }

  reduce = (state, action) => {
    let costs;
    switch (action.action) {
    case ActionType.REGULARCOST.ADD:
      costs = state.costs.slice();
      costs.push({index: getLastIndex(state.costs) + 1});
      return {...state, costs};

    case ActionType.REGULARCOST.REMOVE:
      costs = state.costs.slice();
      return {...state,
        costs: costs.filter(
          element => element.index !== action.index
        )
      };

    case ActionType.REGULARCOST.MANAGER:
      postOrPutStrategy(
        action.regularCostManager,
        routeMap.cost_manager,
        {},
        (data) => AppDispatcher.dispatch({
          action: ActionType.REGULARCOST.SUCCESS,
          data: data,
          state: 'regularCostManager'
        })
      );
      return state;

    case ActionType.REGULARCOST.SUCCESS:
      return {...state, [action.state]: action.data, canSubmit: true};

    case ActionType.REGULARCOST.TYPE:
      getData(
        routeMap.cost_type,
        (data) => AppDispatcher.dispatch({
          action: ActionType.REGULARCOST.TYPESUCCESS,
          types: data
        })
      );
      return state;

    case ActionType.REGULARCOST.TYPESUCCESS:
      return {...state, types: action.types};

    case ActionType.REGULARCOST.SUBFORM:
      postOrPutStrategy(
        state.costs.find( cost => action.index === cost.index),
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.CLIENT.SUBFORMSUCCESS,
            data: data,
            state: action.state,
            index: action.index
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.CLIENT.SUBFORMSUCCESS:
      state.costs.find( (cost, index) => {
        if (cost.index === action.index){
          action.data.index = index;
          state.costs[index] = action.data;
          return true;
        }
      });
      return {...state};

    default:
      return state;
    }
  }
}

export default new RegularCostStore();
