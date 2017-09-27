'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
import ActionType from '../actions/ActionType';

class PasswordStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){ return {send: false, snack: false, message: ''}; }

  reduce = (state, action) => {
    switch (action.actionType) {
    case ActionType.PASSWORD.CHANGE:
      console.log(state, action);
      postData('/api/auth/password/',
        action.data,
        (data) => {
          AppDispatcher.dispatch({actionType: ActionType.PASSWORD.SUCCESS,
            data: data});
        },
        () => {
          AppDispatcher.dispatch({actionType: ActionType.PASSWORD.FAIL});
        }
        );
      return {...state, send: true};

    case ActionType.PASSWORD.RESET:
      return {userExist: false};

    case ActionType.PASSWORD.FAIL:
      return {
        send: false,
        snack: true,
        message: 'Falha ao alterar a senha.'
      };

    case ActionType.PASSWORD.SUCCESS:
      return {
        send: false,
        snack: true,
        message: 'Senha alterada com sucesso!'
      };

    case ActionType.PASSWORD.SNACKCLOSE:
      return {
        ...state,
        snack: false
      };

    default:
      console.log(action);
      return state;
    }
  }
}

export default new PasswordStore();
