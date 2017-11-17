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
export {getRegularCostTypes, getActiveTypes, getTypesForClient};
