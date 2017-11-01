'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {postData, getData} from '../resources/Requests';
import {/*getUrl, */routeMap} from '../routes/RouteMap';

class GoalStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      goals: [0],
      idx: 1,
      id: undefined,
      types: [],
      hasEndDate: false
    };
  }

  reduce = (state, action) => {
    let new_array;
    switch (action.action) {
    case ActionType.GOAL.ADD:
      new_array = state.goals.slice();
      new_array.push(state.idx);
      return {...state, goals: new_array, idx: state.idx + 1};

    case ActionType.GOAL.REMOVE:
      new_array = state.goals.slice();
      return {...state,
        goals: new_array.filter( element => element !== action.key )
      };

    case ActionType.GOAL.MANAGER:
      postData(
        routeMap.goal_manager,
        {},
        (data) => AppDispatcher.dispatch({
          action: ActionType.GOAL.SUCCESS,
          id: data.id
        })
      );
      return state;

    case ActionType.GOAL.SUCCESS:
      return {...state, id: action.id};

    case ActionType.GOAL.TYPE:
      getData(
        routeMap.goal_type,
        (data) => AppDispatcher.dispatch({
          action: ActionType.GOAL.TYPESUCCESS,
          types: data
        })
      );
      return state;

    case ActionType.GOAL.TYPESUCCESS:
      return {...state, types: action.types};

    case ActionType.GOAL.HASEND:
      return {...state, hasEndDate: action.hasEnd};

    case ActionType.GOAL.SUBFORM:
      postData(action.route, action.data, (e) => console.log(e));
      return state;

    default:
      return state;
    }
  }
}

export default new GoalStore();

