import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import LoginPage from '../auth/LoginPage';
import LogoutButton from '../auth/LogoutButton';
import PasswordForm from '../auth/form/PasswordForm';
import ResetForm from '../auth/ResetForm';
import {AuthorizedRoute, NotFoundRoute} from './Router';
import ClientRegister from '../client/ClientRegister';

export default class Routers extends Component{

  render(){
    return (
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/register/client" component={ClientRegister} />
        <AuthorizedRoute path="/logout" component={ LogoutButton } />
        <AuthorizedRoute path="/login/changepassword" render={ () => <PasswordForm userid={3} username="Marcelo" /> } />
        <Route path="/login/resetpassword" render={ () => <ResetForm email="marcelohpf@hotmail.com" /> } />
        <Route component={ NotFoundRoute } />
      </Switch>
    );
  }
}
