import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Auth} from '../auth/Auth';

export default class AuthorizedLink extends Component{
  render() {
    const {permission, ...props} = this.props;
    return (
      Auth.hasPermission(permission) ? (<Link {...props} />) : (null)
    );
  }
}
AuthorizedLink.propTypes = {
  permission: PropTypes.string,
};
