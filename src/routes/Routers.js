import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import LoginPage from '../auth/LoginPage';
import LogoutButton from '../auth/LogoutButton';
import PasswordForm from '../auth/form/PasswordForm';
import ResetForm from '../auth/ResetForm';
import {AuthorizedRoute, NotFoundRoute} from './Router';
import ClientTable from '../client/ClientTable';

export default class Routers extends Component{

  render(){
    return (
      <Switch>
        <Route exact path="/" render={() => <ClientTable />} />
        <Route exact path="/login" component={ LoginPage } />
        <AuthorizedRoute path="/logout" component={ LogoutButton } />
        <AuthorizedRoute path="/login/changepassword" render={ () => <PasswordForm userid={3} username="Marcelo" /> } />
        <Route path="/login/resetpassword" render={ () => <ResetForm email="marcelohpf@hotmail.com" /> } />
        <Route component={ NotFoundRoute } />
      </Switch>
    );
  }
}
