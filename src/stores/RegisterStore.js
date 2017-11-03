'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {postData} from '../resources/Requests';
import {routeMap} from '../routes/RouteMap';

class RegisterStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ 
    return {
      financialPlanning: {},
      stepIndex: 0,
    };
  }

  reduce = (state, action) => {
    switch (action.action) {

    case ActionType.CLIENT.POSTFORMSUCCESS:
      console.log(state.financialPlanning.active_client_id, action.state);
      if (!state.financialPlanning.active_client_id && action.state === 'active_client') {
        postData(routeMap.financial_planning,
          {pk: action.data.id,
            cdi: 0,
            ipca: 0,
            target_profitability: 0},
          (data) => {
            AppDispatcher.dispatch({
              action: ActionType.REGISTER.STORE,
              data: data
            });
          }
        );
      }
      return state;

    case ActionType.REGISTER.STORE:
      return {...state, financialPlanning: action.data};

    default:
      return state;
    }
  }
}

export default new RegisterStore();
