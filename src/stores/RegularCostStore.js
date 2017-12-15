'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {postOrPutStrategy} from '../resources/Requests';
import {removeRegularCost} from '../resources/removeModels';
import getLastIndex from '../utils/getLastIndex';

class RegularCostStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      costs: [{index: 0, selected: true}],
      manager: {},
      types: [],
      canSubmit: false,
      costChanges: [],
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
      return {...state, manager: action.data, costs};

    case ActionType.REGULARCOST.CHANGES:
      costs = action.data.map(
        cost => { cost.index = cost.id; return cost;}
      );
      return {...state, costChanges: costs};

    case ActionType.REGULARCOST.ADD:
      costs = state[action.state].slice();
      costs.push({
        index: getLastIndex(costs) + 1,
        selected: true
      });
      return {...state, [action.state]: costs};

    case ActionType.REGULARCOST.SELECT:
      state[action.state].find( cost => {
        if (cost.index === action.key) {
          cost.selected = !cost.selected;
          return true;
        }
      });
      return {...state};

    case ActionType.REGULARCOST.REMOVE:
      costs = removeRegularCost(state[action.state], action.key, action.remove);
      return {...state, [action.state]: costs };

    case ActionType.REGULARCOST.SUCCESS:
      delete action.data['regular_costs'];
      return {...state, [action.state]: action.data};

    case ActionType.REGULARCOST.TYPESUCCESS:
      return {...state, types: action.types};

    case ActionType.REGULARCOST.SUBMIT:
      postOrPutStrategy(
        state[action.state].find( cost => action.key === cost.index),
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.REGULARCOST.SUBMITSUCCESS,
            data: data,
            state: action.state,
            key: action.key
          });
        }
      );
      return state;

    case ActionType.REGULARCOST.SUBMITSUCCESS:
      state[action.state].find( (cost, index) => {
        if (cost.index === action.key){
          action.data.index = cost.id;
          state[action.state][index] = action.data;
          return true;
        }
      });
      return {...state};

    case ActionType.RESETFORMSTORES:
      return {...state,
        costs: [{index: 0, selected: true}],
        manager: {},
        costChanges: []
      };

    default:
      return state;
    }
  }
}

export default new RegularCostStore();
