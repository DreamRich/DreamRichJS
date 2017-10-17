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
      types: []
    };
  }

  reduce = (state, action) => {
    let new_array;
    switch (action.actionType) {
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
      postData('/api/financial_planning/costmanager/',{},
        (data) => AppDispatcher.dispatch({
          actionType: ActionType.GOAL.SUCCESS,
          id: data.id
        })
      );
      return state;

    case ActionType.GOAL.SUCCESS:
      return {...state, id: action.id};

    case ActionType.GOAL.TYPE:
      getData('/api/goal/goal_type/',
        (data) => AppDispatcher.dispatch({
          actionType: ActionType.GOAL.TYPESUCCESS,
          types: data
        })
      );
      return state;

    case ActionType.GOAL.TYPESUCCESS:
      return {...state, types: action.types};

    default:
      return state;
    }
  }
}

export default new GoalStore();

