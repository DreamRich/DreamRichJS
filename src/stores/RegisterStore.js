'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {postData, putData} from '../resources/Requests';
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
    let financialPlanning;
    switch (action.action) {

    case ActionType.CLIENT.POSTFORMSUCCESS:
      if (!state.financialPlanning.active_client_id && action.state === 'active_client') {
        postData(routeMap.financial_planning,
          {pk: action.data.id,
            cdi: 0,
            ipca: 0,
            target_profitability: 0},
          (data) => {
            data.pk = action.data.id;
            data.active_client_id = action.data.id;
            AppDispatcher.dispatch({
              action: ActionType.REGISTER.STORE,
              data: data,
            });
          }
        );
      }
      return state;

    case ActionType.REGULARCOST.SUCCESS:
      financialPlanning = state.financialPlanning;
      if (!financialPlanning.cost_manager_id) {
        financialPlanning.cost_manager_id = action.data.id;
        putData(
          `${routeMap.financial_planning}${financialPlanning.pk}/`,
          financialPlanning,
        );
      }
      return {...state, financialPlanning};

    case ActionType.GOAL.SUCCESS:
      financialPlanning = state.financialPlanning;
      if (!financialPlanning.goal_manager_id) {
        financialPlanning.goal_manager_id = action.data.id;
        putData(
          `${routeMap.financial_planning}${financialPlanning.pk}/`,
          financialPlanning,
        );
      }
      return {...state, financialPlanning};

    case ActionType.REGISTER.STORE:
      return {...state, financialPlanning: action.data};

    case ActionType.RESETFORMSTORES:
      return {stepIndex: 0, financialPlanning: {}};

    default:
      return state;
    }
  }
}

export default new RegisterStore();
