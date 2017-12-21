'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {postData, putData} from '../resources/Requests';
import {routeMap} from '../routes/RouteMap';

const AMOUNT = 1;

class RegisterStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ 
    return {
      financialPlanning: {},
      state: 0,
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

    case ActionType.PATRIMONY.POSTFORMSUCCESS:
      financialPlanning = state.financialPlanning;
      if (!financialPlanning.patrimony_id && action.state === 'patrimony') {
        financialPlanning.patrimony_id = action.data.id;
        putData(
          `${routeMap.financial_planning}${financialPlanning.pk}/`,
          financialPlanning,
        );
      }
      return {...state, financialPlanning};

    case ActionType.INDEPENDENCE.SUCCESS:
      financialPlanning = state.financialPlanning;
      if (!financialPlanning.financial_independence_id) {
        financialPlanning.financial_independence_id = action.data.id;
        putData(
          `${routeMap.financial_planning}${financialPlanning.pk}/`,
          financialPlanning,
        );
      }
      return {...state, financialPlanning};

    case ActionType.REGISTER.SUBMIT:
      financialPlanning = {...state.financialPlanning, ...action.data};
      putData(
        `${routeMap.financial_planning}${financialPlanning.pk}/`,
        financialPlanning,
        (data) => AppDispatcher.dispatch({
          action: ActionType.REGISTER.STORE,
          data: data
        })
      );
      return state;

    case ActionType.REGISTER.STORE:
      return {...state, financialPlanning: action.data, loading: AMOUNT};

    case ActionType.REGULARCOST.GETFORMSUCCESS:
      return {...state, loading: state.loading+AMOUNT};
    case ActionType.GOAL.GETFORMSUCCESS:
      return {...state, loading: state.loading+AMOUNT};
    case ActionType.CLIENT.GETFORMSUCCESS:
      return {...state, loading: state.loading+AMOUNT};
    case ActionType.INDEPENDENCE.GETFORMSUCCESS:
      return {...state, loading: state.loading+AMOUNT};
    case ActionType.PATRIMONY.GETFORMSUCCESS:
      return {...state, loading: state.loading+AMOUNT};
    case ActionType.RESETFORMSTORES:
      return {financialPlanning: {}};

    default:
      return state;
    }
  }
}

export default new RegisterStore();
