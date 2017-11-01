'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {postData, getData} from '../resources/Requests';
import {/*getUrl, */routeMap} from '../routes/RouteMap';

class RegularCostStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      costs: [0],
      idx: 1,
      id: undefined,
      types: []
    };
  }

  reduce = (state, action) => {
    let new_array;
    switch (action.action) {
    case ActionType.REGULARCOST.ADD:
      new_array = state.costs.slice();
      new_array.push(state.idx);
      return {...state, costs: new_array, idx: state.idx + 1};

    case ActionType.REGULARCOST.REMOVE:
      new_array = state.costs.slice();
      return {...state,
        costs: new_array.filter( element => element !== action.key )
      };

    case ActionType.REGULARCOST.MANAGER:
      postData(
        routeMap.cost_manager,
        {},
        (data) => AppDispatcher.dispatch({
          action: ActionType.REGULARCOST.SUCCESS,
          id: data.id
        })
      );
      return state;

    case ActionType.REGULARCOST.SUCCESS:
      return {...state, id: action.id};

    case ActionType.REGULARCOST.TYPE:
      getData(
        routeMap.cost_type,
        (data) => AppDispatcher.dispatch({
          action: ActionType.REGULARCOST.TYPESUCCESS,
          types: data
        })
      );
      return state;

    case ActionType.REGULARCOST.TYPESUCCESS:
      return {...state, types: action.types};

    case ActionType.REGULARCOST.SUBFORM:
      postData(action.route, action.data, (e) => console.log(e));
      return state;

    default:
      return state;
    }
  }
}

export default new RegularCostStore();
