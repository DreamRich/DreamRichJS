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

const postRegularCostManager = () => {
  postData(
    routeMap.cost_manager,
    {},
    (data) => AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.SUCCESS,
      data: data,
      state: 'manager'
    })
  );
};

const postGoalManager = () => {
  postData(
    routeMap.goal_manager,
    {},
    (data) => AppDispatcher.dispatch({
      action: ActionType.GOAL.SUCCESS,
      data: data,
      state: 'manager'
    })
  );
};

export {postGoalManager, postActiveManager, postRegularCostManager};
