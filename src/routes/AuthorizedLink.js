import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Auth} from '../auth/Auth';

export default class AuthorizedLink extends Component{
  static propTypes = {
    permission: PropTypes.string,
  }

  render() {
    const {permission, ...props} = this.props;
    return (
      Auth.hasPermission(permission) ? (<Link {...props} />) : (null)
    );
  }
}

