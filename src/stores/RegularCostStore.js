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
    case ActionType.REGULARCOST.GETFORMSUCCESS:
      costs = action.data.regular_costs.map(
        cost => { cost.index = cost.id; return cost;}
      );
      delete action.data['regular_costs'];
      return {...state, regularCostManager: action.data, costs};

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
        state.regularCostManager,
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
      delete action.data['regular_costs'];
      return {...state, [action.state]: action.data};

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

    case ActionType.REGULARCOST.SUBMIT:
      return {...state, canSubmit: true};

    case ActionType.REGULARCOST.SUBFORM:
      postOrPutStrategy(
        state.costs.find( cost => action.index === cost.index),
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.REGULARCOST.SUBFORMSUCCESS,
            data: data,
            state: action.state,
            index: action.index
          });
        }
      );
      return state;

    case ActionType.REGULARCOST.SUBFORMSUCCESS:
      state.costs.find( (cost, index) => {
        if (cost.index === action.index){
          action.data.index = cost.id;
          state.costs[index] = action.data;
          return true;
        }
      });
      return {...state, canSubmit: false};

    default:
      return state;
    }
  }
}

export default new RegularCostStore();
