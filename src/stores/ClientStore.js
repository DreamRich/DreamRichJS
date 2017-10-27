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
      canSubmit: false,
      stepIndex: 0,
      countries: [],
      states: [],
      addressType: [''],
      active_client: {},
    };
  }

  reduce = (state, action) => {
    console.log(state);
    switch (action.action) {

    case ActionType.CLIENT.SUBMIT:
      return {...state, canSubmit: true};

    case ActionType.CLIENT.ACTIVE:
      postData(
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.CLIENT.ACTIVESUCCESS,
            data: data,
            state: action.state,
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.CLIENT.ACTIVESUCCESS:
      return {...state,
        [action.state]: action.data,
        stepIndex: state.stepIndex + 1
      };

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

    default:
      return state;
    }
  }

}

export default new ClientStore();
