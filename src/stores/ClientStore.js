'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData, getData, postOrPutStrategy} from '../resources/Requests';
//import {Auth} from '../auth/Auth';
import ActionType from '../actions/ActionType';
import {routeMap} from '../routes/RouteMap';
// import {/*getUrl, */routeMap} from '../routes/RouteMap';

class ClientStore extends ReduceStore {

  constructor(){ super(AppDispatcher); }


  getInitialState(){
    return {
      sponse: {},
      canSubmit: false,
      stepIndex: 0,
      active_client: {},
      dependents: [],
      searchText: undefined,
    };
  }

  reduce = (state, action) => {
    switch (action.action) {

    case ActionType.CLIENT.ID:
      getData(
        routeMap.active_client + action.id + '/',
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.CLIENT.GETFORMSUCCESS,
            data: data,
            state: 'active_client',
          });
        }
      );
      return state;

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
        state.dependents.find( dependent => action.index === dependent.index),
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.CLIENT.POSTMULTIFORMSUCCESS,
            data: data,
            state: action.state,
            index: action.index
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.CLIENT.POSTMULTIFORMSUCCESS:
      state.dependents.find( (dependent, index) => {
        if (dependent.index === action.index){
          action.data.index = index;
          state.dependents[index] = action.data;
          return true;
        }
      });
      return {...state};

    case ActionType.CLIENT.SETSTEP:
      return {...state, stepIndex: action.stepIndex};

    case ActionType.CLIENT.SUBFORM:
      postData(action.route, action.data, (e) => console.log(e));
      return state;

    case ActionType.CLIENT.ADDDEPENDENT:
      state.dependents.push(
        {index: this.getLastIndex(state) + 1}
      );
      return {...state};

    case ActionType.CLIENT.REMOVEDEPENDENT:
      var dependents = state.dependents.slice();
      return {...state, dependents: dependents.filter(
        e => e.index !== action.key
      )};

    default:
      return state;
    }
  }

  getLastIndex = (state) => {
    const index = state.dependents.length-1;
    const lastDependent = state.dependents[index];
    return lastDependent === undefined ? 0 : lastDependent.index;
  }

  getClientState = (data) => {
    // Get data from a action and mount a array of data for a client
    if (data !== undefined && data !== null) {
      const address = data.addresses[data.addresses.length-1] || {state: {}};
      const bank_account = data.bank_account || {};
      const sponse = data.spouse || {};
      const dependents = data.dependents.map(
        dependent => {
          dependent.index = dependent.id;
          return dependent;
        });
      delete data['addresses'];
      delete data['dependents'];
      delete data['bank_account'];
      delete data['spouse'];

      const active_client = data;

      return {active_client, dependents, bank_account, sponse, address};
    }

    return {};
  }

}

export default new ClientStore();
