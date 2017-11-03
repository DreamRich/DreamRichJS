import {getData} from './Requests';
import {routeMap} from '../routes/RouteMap';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';

const getClient = (id) => {
  getData(
    `${routeMap.active_client}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.CLIENT.GETFORMSUCCESS,
        data: data,
        state: 'active_client',
      });
    }
  );
};

const getRegularCostManager = (id) => {
  getData(
    `${routeMap.cost_manager}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.REGULARCOST.GETFORMSUCCESS,
        data: data,
        state: 'regularCostManager',
      });
    }
  );
};

const getGoalManager = (id) => {
  getData(
    `${routeMap.goal_manager}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.GOAL.GETFORMSUCCESS,
        data: data,
        state: 'goalManager',
      });
    }
  );
};

const getPatrimony = (id) => {
  getData(`${routeMap.patrimony}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.PATRIMONY.GETFORMSUCCESS,
        data: data,
        state: 'patrimony',
      });
    }
  );

};

const getFinancialPlanning = (id) => {
  getData(`${routeMap.financial_planning}${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.REGISTER.STORE,
        data: data,
      });
      getClient(data.active_client_id);
      if (data.cost_manager_id) {
        getRegularCostManager(data.cost_manager_id);
      }
      if (data.goal_manager_id) {
        getGoalManager(data.goal_manager_id);
      }
      if (data.patrimony_id) {
        getPatrimony(data.patrimony_id);
      }
      // others gets
    });
};

export {getClient, getFinancialPlanning};
