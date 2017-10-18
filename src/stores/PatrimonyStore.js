'use strict';

import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import {postData} from '../resources/Requests';
import {getData} from '../resources/Requests';
import ActionType from '../actions/ActionType';
import {routeMap} from '../routes/RouteMap';

class PatrimonyStore extends ReduceStore {
  constructor(){ super(AppDispatcher); }

  getInitialState(){
    return {
      send: false,
      snack: false,
      message: '',
      emailExist: true,
      openSendedMessage: true
    };
  }

  buildResetFormMessage = (responseStatus, state) => {
    var message = '';

    if(responseStatus.status === 200){
      message = 'Email enviado com sucesso';
    } else if(responseStatus.status === 404){
      message = 'Falha ao enviar o email';
    }
    state = {...state, message: message};
    return state;
  }

  buildPasswordFormMessage = (responseStatus, state) => {
    var message = '';

    if(responseStatus.status === 200){
      message = 'Senha alterada com sucesso';
    } else if(responseStatus.status === 400){
      message = 'Falha ao alterar a senha';
    }
    state = {...state, message: message};
    return state;
  }

  reduce = (state, action) => {
    switch (action.actionType) {
    case ActionType.PATRIMONY:
      postData(
        routeMap.patrimony,
        action.data,
        () => {},
        (responseStatus) => {
          state = this.buildPasswordFormMessage(responseStatus, state);
          AppDispatcher.dispatch({actionType: ActionType.PASSWORD.FAIL,
            data: state});
        },
        (responseStatus) => {
          state = this.buildPasswordFormMessage(responseStatus, state);
          AppDispatcher.dispatch({actionType: ActionType.PASSWORD.SUCCESS,
            data: state});
        }
      );
      return {...state, send: true};

    case ActionType.PASSWORD.RESET:
      getData('/api/auth/password/?email='+action.data.email,
        () => {},
        (responseStatus) => {
          state = this.buildResetFormMessage(responseStatus, state);
          AppDispatcher.dispatch({actionType: ActionType.PASSWORD.SUCCESS,
            data: state});
        },
        (responseStatus) => {
          state = this.buildResetFormMessage(responseStatus, state);
          AppDispatcher.dispatch({actionType: ActionType.PASSWORD.FAIL,
            data: state});
        },
        false
      );
      return {...state, send: true, emailExist: true};

    case ActionType.PASSWORD.FAIL:
      return {
        ...state,
        send: false,
        snack: true,
        message: action.data.message,
        emailExist: false};

    case ActionType.PASSWORD.SUCCESS:
      return {
        send: false,
        snack: true,
        message: action.data.message,
        openSendedMessage: false
      };

    case ActionType.PASSWORD.SNACKCLOSE:
      return {
        ...state,
        snack: false
      };

    case ActionType.PASSWORD.UNMOUNT:
      return {...this.getInitialState()};

    default:
      return state;
    }
  }
}

export default new PatrimonyStore();
