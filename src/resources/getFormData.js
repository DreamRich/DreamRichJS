import {routeMap} from '../routes/RouteMap';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {getData} from './Requests';

const getActiveTypes = () => {
  getData(routeMap.active_type,
    (data) => AppDispatcher.dispatch({
      action: ActionType.PATRIMONY.TYPESUCCESS,
      types: data
    })
  );
};

const getRegularCostTypes = () => {
  getData(
    routeMap.cost_type,
    (data) => AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.TYPESUCCESS,
      types: data
    })
  );
};

const getGoalTypes = () => {
  getData(
    routeMap.goal_type,
    (data) => AppDispatcher.dispatch({
      action: ActionType.GOAL.TYPESUCCESS,
      types: data
    })
  );
};

const getTypesForClient = () => {
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
};

const getStates = (country_id) => {
  getData(
    `${routeMap.state}?country_id=${country_id}`,
    (states) => AppDispatcher.dispatch({
      action: ActionType.CLIENT.STATESUCCESS,
      data: states,
    })
  );
};

export {getStates, getGoalTypes, getRegularCostTypes, getActiveTypes, getTypesForClient};
