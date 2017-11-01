import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Auth} from '../auth/Auth';
import {NotAuthorizedRoute} from './Router';
import PropTypes from 'prop-types';

export default class AuthorizedRoute extends Component{
  static propTypes = {
    permission: PropTypes.string,
  }

  render() {
    return (
      Auth.hasPermission(this.props.permission) ? (<Route {...this.props} />) : (<NotAuthorizedRoute />)
    );
  }
}

