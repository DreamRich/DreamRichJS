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

const getFinancialPlanning = (id) => {
  getData(`${routeMap.financial_planning}/${id}/`,
    (data) => {
      AppDispatcher.dispatch({
        action: ActionType.REGISTER.STORE,
        data: data,
      });
      getClient(data.active_client_id);
      if (data.cost_manager_id) {
        getRegularCostManager(data.cost_manager_id);
      }
      // others gets
    });
};

export {getClient, getFinancialPlanning};
