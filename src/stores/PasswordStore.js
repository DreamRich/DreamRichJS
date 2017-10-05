'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
import {getRealData} from '../resources/Requests';
import ActionType from '../actions/ActionType';

class PasswordStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      send: false,
      snack: false,
      message: '',
      emailExist: true,
    };
  }

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
      console.log(state, action);
      getRealData('/api/auth/password/',
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

    case ActionType.PASSWORD.FAIL:
      return {
        ...state,
        send: false,
        snack: true,
        message: 'Falha ao alterar a senha',
        emailExist: false};

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
