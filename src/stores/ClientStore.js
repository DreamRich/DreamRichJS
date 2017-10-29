'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData, getData} from '../resources/Requests';
//import {Auth} from '../auth/Auth';
import ActionType from '../actions/ActionType';
import {routeMap} from '../routes/RouteMap';
// import {/*getUrl, */routeMap} from '../routes/RouteMap';

class ClientStore extends ReduceStore {

  constructor(){ super(AppDispatcher); }


  getInitialState(){
    return {
      sponse: false,
      canSubmit: false,
      stepIndex: 0,
      countries: [],
      states: [],
      addressType: [],
      active_client: {},
      dependents: [],
    };
  }

  reduce = (state, action) => {
    console.log(state);
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
      postData(
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
      postData(
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

    case ActionType.CLIENT.STATES:
      getData(
        `${routeMap.state}?country_id=${action.country}`,
        (states) => AppDispatcher.dispatch({
          action: ActionType.CLIENT.STATESUCCESS,
          data: states,
        })
      );
      return state;

    case ActionType.CLIENT.COUNTRIES:
      return {...state, countries: action.data};

    case ActionType.CLIENT.ADDRESSTYPE:
      return {...state, addressType: action.data};

    case ActionType.CLIENT.STATESUCCESS:
      return {...state, states: action.data};

    case ActionType.CLIENT.DATAFORM:
      getData(
        routeMap.address_type,
        (addressType) => AppDispatcher.dispatch({
          action: ActionType.CLIENT.ADDRESSTYPE,
          data: addressType,
        })
      );
      getData(
        routeMap.country,
        (countries) => AppDispatcher.dispatch({
          action: ActionType.CLIENT.COUNTRIES,
          data: countries,
        })
      );
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
    if (data !== undefined && data !== null) {
      const address = data.addresses[data.addresses.length-1];
      const dependents = data.dependents.map(
        dependent => {
          dependent.index = dependent.id;
          return dependent;
        });
      const bank_account = data.bank_account;
      const sponse = data.spouse;
      delete data['addresses'];
      delete data['dependents'];
      delete data['bank_account'];
      delete data['spouse'];

      const active_client = data;
      console.log({active_client, dependents, bank_account, sponse, address});
      return {active_client, dependents, bank_account, sponse, address};
    }
    return {};
  }

}

export default new ClientStore();
