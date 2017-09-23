import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';

export default class LogoutButton extends Component{

  render(){
    return (<button onClick={
      () => { AppDispatcher.dispatch({actionType: 'logout'}); }
    } >logout</button>
    );
  }
}
