import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Auth} from '../auth/Auth';

export default class AuthorizedLink extends Component{
  render() {
    return (
      Auth.hasPermission(this.props.permission) ? (<Link {...this.props} />) : (null)
    );
  }
}
AuthorizedLink.propTypes = {
  permission: PropTypes.string,
};
