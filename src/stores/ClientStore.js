'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
//import {Auth} from '../auth/Auth';
import ActionType from '../actions/ActionType';

class ClientStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {id: undefined}; }

  reduce = (state, action) => {
    switch (action.actionType) {
    case ActionType.CLIENT.ACTIVE:
      console.log(action.data);
      /* This if - else with state.id was added only because the form doesn't
       * have validation on the fields... and may cause a resubmition in form
       * it should be unnecessary when the validations have been implemented
       * #TODO: remove this if - else after validations in fields
       */
      if(!state.id){
        postData('/api/client/active/',
          action.data,
          (data) => {
            AppDispatcher.dispatch({
              actionType: ActionType.CLIENT.ACTIVESUCCESS,
              id: data.id
            });
          }
        );
      } else {
        setTimeout(() => 
          AppDispatcher.dispatch({
            actionType: ActionType.CLIENT.ACTIVESUCCESS,
            id: state.id 
          }), 1000);
      }
      return {...state, id: undefined};
    case ActionType.CLIENT.ACTIVESUCCESS:
      console.log(action);
      return {...state, id: action.id};
    case ActionType.CLIENT.SUBFORM:
      console.log(action.route);
      console.log(action.data);
      postData(action.route, action.data, (e) => console.log(e));
      return state;
    default:
      return state;
    }
  }
}

export default new ClientStore();
