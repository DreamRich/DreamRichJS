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

export {getRegularCostTypes, getActiveTypes};
