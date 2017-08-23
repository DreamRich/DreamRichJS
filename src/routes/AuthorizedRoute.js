import React, {Component} from 'react';
import {Route} from 'react-router-dom'
import {Auth} from '../auth/Auth';
import NotAuthorized from '../NotAuthorized';

export default class AuthorizedRoute extends Component{
  render() {
    return (
      Auth.isAuthenticated() ? (<Route {...this.props} />) : (<NotAuthorized />)
    );
  }
}
