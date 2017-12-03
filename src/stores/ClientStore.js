'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postOrPutStrategy} from '../resources/Requests';
import {removeClient} from '../resources/removeModels';
import ActionType from '../actions/ActionType';
import getLastIndex from '../utils/getLastIndex';


class ClientStore extends ReduceStore {

  constructor(){ super(AppDispatcher); }


  getInitialState(){
    return {
      spouse: {},
      canSubmit: false,
      stepIndex: 0,
      active_client: {},
      dependents: [],
      searchText: undefined,
    };
  }

  reduce = (state, action) => {
    switch (action.action) {

    case ActionType.CLIENT.GETFORMSUCCESS:
      return {...state, ...this.getClientState(action.data)};

    case ActionType.CLIENT.SUBMIT:
      return {...state, canSubmit: true};

    case ActionType.CLIENT.POSTFORM:
      postOrPutStrategy(
        state[action.state],
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.CLIENT.POSTFORMSUCCESS,
            data: data,
            state: action.state,
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.CLIENT.POSTFORMSUCCESS:
      return {...state,
        [action.state]: action.data,
        stepIndex: state.stepIndex + 1
      };

    case ActionType.CLIENT.POSTMULTIFORM:
      postOrPutStrategy(
        state.dependents.find( dependent => action.key === dependent.index),
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.CLIENT.POSTMULTIFORMSUCCESS,
            data: data,
            state: action.state,
            key: action.key
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.CLIENT.POSTMULTIFORMSUCCESS:
      state.dependents.find( (dependent, index) => {
        if (dependent.index === action.key){
          action.data.index = index;
          action.data.selected = false;
          state.dependents[index] = action.data;
          return true;
        }
      });
      return {...state};

    case ActionType.CLIENT.SETSTEP:
      return {...state, stepIndex: action.stepIndex};

    case ActionType.CLIENT.ADDDEPENDENT:
      state.dependents.push(
        {index: getLastIndex(state.dependents) + 1,
          selected: true}
      );
      return {...state};

    case ActionType.CLIENT.SELECTDEPENDENT:
      state.dependents.find( dependent => {
        if (dependent.index === action.key) {
          dependent.selected = !dependent.selected;
          return true;
        }
      });
      return {...state};

    case ActionType.CLIENT.REMOVEDEPENDENT:
      return {
        ...state,
        dependents: removeClient(state.dependents, action.key)
      };

    case ActionType.RESETFORMSTORES:
      return {...state,
        dependents: [{index: 0}],
        spouse: {},
        active_client: {}};

    default:
      return state;
    }
  }


  getClientState = (data) => {
    // Get data from a action and mount a array of data for a client
    if (data !== undefined && data !== null) {
      const address = data.addresses[data.addresses.length-1] || {state: {}};
      const bank_account = data.bank_account || {};
      const spouse = data.spouse || {};
      const dependents = data.dependents.map(
        dependent => {
          dependent.index = dependent.id;
          dependent.selected = false;
          return dependent;
        });
      delete data['addresses'];
      delete data['dependents'];
      delete data['bank_account'];
      delete data['spouse'];

      const active_client = data;

      return {active_client, dependents, bank_account, spouse, address};
    }

    return {};
  }

}

export default new ClientStore();
