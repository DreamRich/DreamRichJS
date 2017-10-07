import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';

export default class LogoutButton extends Component{

  render(){
    return (<button onClick={
      () => { AppDispatcher.dispatch({actionType: ActionType.LOGOUT}); }
    } >logout</button>
    );
  }
}
