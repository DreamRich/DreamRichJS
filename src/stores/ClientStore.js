'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
//import {Auth} from '../auth/Auth';
import ActionType from '../actions/ActionType';
// import {/*getUrl, */routeMap} from '../routes/RouteMap';

class ClientStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ 
    return {canSubmit: false, stepIndex: 0 };
  }

  reduce = (state, action) => {
    console.log(state);
    switch (action.action) {
    case ActionType.CLIENT.SUBMIT:
      return {...state, canSubmit: true};

    case ActionType.CLIENT.ACTIVE:
      postData(
        action.route,
        action.data,
        (data) => {
          AppDispatcher.dispatch({
            action: ActionType.CLIENT.ACTIVESUCCESS,
            data: data,
            state: action.state
          });
        }
      );
      return {...state, canSubmit: false};

    case ActionType.CLIENT.ACTIVESUCCESS:
      return {...state, id: action.id, stepIndex: state.stepIndex+1};

    case ActionType.CLIENT.SETSTEP:
      return {...state, stepIndex: action.stepIndex};

    case ActionType.CLIENT.SUBFORM:
      postData(action.route, action.data, (e) => console.log(e));
      return state;

    default:
      return state;
    }
  }
}

export default new ClientStore();
