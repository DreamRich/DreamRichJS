import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Auth} from '../auth/Auth';
import {NotAuthorizedRoute} from './Router';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';

export default class AuthorizedRoute extends Component{
  static propTypes = {
    permission: PropTypes.string,
    location: PropTypes.object,
  }

  render() {
    // console.log(this.props.location);

    if (Auth.hasPermission(this.props.permission) ) {
      return <Route {...this.props} />;
    } else if (Auth.isAuthenticated()) {
      return <NotAuthorizedRoute />;
    }
    return <Redirect to={{
      pathname: '/login',
      state: { from: this.props.location }
    }} />;
  }
}

