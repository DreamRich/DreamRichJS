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

export {getActiveTypes};
