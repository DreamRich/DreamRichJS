'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {getData} from '../resources/Requests';
//import {Auth} from '../auth/Auth';
import ActionType from '../actions/ActionType';
import {routeMap} from '../routes/RouteMap';
// import {/*getUrl, */routeMap} from '../routes/RouteMap';

class AddressStore extends ReduceStore {

  constructor(){ super(AppDispatcher); }


  getInitialState(){
    return {
      countries: [],
      states: [],
      addressType: [],
      searchText: undefined,
    };
  }

  reduce = (state, action) => {
    switch (action.action) {

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

    case ActionType.CLIENT.ADDRESSTEXT:
      return {...state, searchText: action.searchText};

    default:
      return state;
    }
  }

}

export default new AddressStore();
