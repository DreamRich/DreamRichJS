import React, {Component} from 'react';
import {Auth} from './Auth';

export default class LogoutButton extends Component{
  render(){
    return (<button onClick={Auth.deauthenticate}></button>
    );
  }
}
