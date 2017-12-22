'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postOrPutStrategy} from '../resources/Requests';
import ActionType from '../actions/ActionType';
import getLastIndex from '../utils/getLastIndex';
import addIndex from '../utils/addIndexItem';
import {removeProtection} from '../resources/removeModels';

class ProtectionStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      canSubmit: false,
      stepIndex: 0,
      equipments: [{index: 0, selected: true}],
      protection_manager: {},
      actual_patrimony_succession: {},
      future_patrimony_succession: {},
      reserve_in_lack: {},
      life_insurances: [],
      private_pensions: [],
    };
  }

  reduce = (state, action) => {
    let arr;
    let item;
    switch (action.action) {

    case ActionType.PROTECTION.SUCCESS:
      return {...state, [action.state]: action.data};

    case ActionType.PROTECTION.GETFORMSUCCESS:
      return {...state, ...this.getProtectionData(action.data)};

    case ActionType.PROTECTION.SUBMIT:
      return {...state, canSubmit: action.canSubmit};

    case ActionType.PROTECTION.POSTFORM:
      postOrPutStrategy(
        state[action.state],
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.PROTECTION.POSTFORMSUCCESS,
            data: data,
            state: action.state
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.PROTECTION.POSTFORMSUCCESS:
      return {...state,
        [action.state]: action.data,
        stepIndex: state.stepIndex + 1};

    case ActionType.PROTECTION.MANAGERSUCCESS:
      return {...state, protection_manager: action.data};

    case ActionType.PROTECTION.POSTMULTIFORM:
      item = state[action.state].find( item => item.index === action.key);
      postOrPutStrategy(
        item,
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.PROTECTION.POSTMULTIFORMSUCCESS,
            data: data,
            state: action.state,
            key: action.key
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.PROTECTION.POSTMULTIFORMSUCCESS:
      state[action.state].find( (item, index) => {
        if (item.index === action.key){
          action.data.index = action.key;
          state[action.state][index] = action.data; // same state.incomes[idx]
          return true;
        }
      });
      return {...state};

    case ActionType.RESETFORMSTORES:
      return {...state, protection: {}};

    case ActionType.PROTECTION.SETSTEP:
      return {...state, stepIndex: action.stepIndex};

    case ActionType.PROTECTION.SELECT:
      state[action.state].find( item => {
        if (item.index === action.key) {
          item.selected = !item.selected;
          return true;
        }
      });
      return {...state};

    case ActionType.PROTECTION.ADD:
      arr = state[action.state].slice();
      arr.push({index: getLastIndex(arr) + 1,
        selected: true
      });
      return {...state, [action.state]: arr};

    case ActionType.PROTECTION.REMOVE:
      arr = removeProtection(action.state,
        state[action.state], action.key, action.remove);
      return {...state, [action.state]: arr};

    case ActionType.PROTECTION.TYPESUCCESS:
      return {...state, types: action.types};

    case ActionType.PROTECTION.CHANGES:
      arr = action.data.map( item => {
        item.index = item.id;
        return item;
      });
      return {...state, [action.state]: arr};

    case ActionType.PROTECTION.FLOW:
      return {...state, flow: action.data};

    default:
      return state;
    }
  }

  getProtectionData = (data) => {

    const protection_manager = {id: data.id};
    delete data.id;

    data.actual_patrimony_succession = data.actual_patrimony_succession || {};
    data.future_patrimony_succession = data.future_patrimony_succession || {};
    data.reserve_in_lack = data.reserve_in_lack || {};

    // Add a index to be render correctly in table form
    data.private_pensions = data.private_pensions.map(addIndex) || [];
    data.life_insurances = data.life_insurances.map(addIndex) || [];

    return {...data, protection_manager};
  }

}

export default new ProtectionStore();
