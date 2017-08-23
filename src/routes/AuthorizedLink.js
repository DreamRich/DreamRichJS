import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Auth} from '../auth/Auth';

export default class AuthorizedLink extends Component{
  render() {
    return (
      Auth.isAuthenticated() ? (<Link {...this.props} />) : (null)
    );
  }
}
