'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {getData} from '../resources/Requests';
import ActionType from '../actions/ActionType';
import {routeMap} from '../routes/RouteMap';


class AddressStore extends ReduceStore {

  constructor(){ super(AppDispatcher); }


  getInitialState(){
    return {
      countries: [],
      states: [],
      addressType: [],
      searchText: '',
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

    case ActionType.CLIENT.ADDRESSTEXT:
      return {...state, searchText: action.searchText};

    case ActionType.RESETFORMSTORES:
      return {...state, searchText: ''};

    default:
      return state;
    }
  }

}

export default new AddressStore();
