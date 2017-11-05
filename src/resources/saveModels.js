import {postData} from './Requests';
import {routeMap} from '../routes/RouteMap';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';

const postActiveManager = (data) => {
  postData(routeMap.activemanager,
    {patrimony_id: data},
    (data) => AppDispatcher.dispatch({
      action: ActionType.PATRIMONY.MANAGERSUCCESS,
      data: data,
    })
  );
};

export {postActiveManager};
