import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import LogoutButton from '../auth/LogoutButton';
import PasswordForm from '../auth/form/PasswordForm';
import ResetForm from '../auth/ResetForm';
import {AuthorizedRoute, NotFoundRoute} from './Router';
import ClientTable from '../client/ClientTable';
import Employeer from '../employee/Employeer';
import PatrimonyForm from '../patrimony/PatrimonyForm';
import ClientRegister from '../client/ClientRegister';
import {Auth} from '../auth/Auth';

export default class Routers extends Component{

  render(){
    return (
      <Switch>
        <Route exact path="/" render={ () => <h1>Home</h1> } />
        <AuthorizedRoute exact path="/client" component={ ClientTable } />
        <AuthorizedRoute path="/employee" component={ Employeer } />
        <Route exact path="/login" component={ LoginPage } />
        <AuthorizedRoute  exact path="/register/client" component={ ClientRegister } />
        <AuthorizedRoute path="/logout" component={ LogoutButton } />
        <AuthorizedRoute path="/login/changepassword" render={ () => <PasswordForm userid={Auth.getUserId()} username={Auth.getUserName()} /> } />
        <Route path="/login/resetpassword" render={ () => <ResetForm email="marcelohpf@hotmail.com" /> } />
        <Route path="/patrimony" component={ PatrimonyForm } />
        <Route component={ NotFoundRoute } />
      </Switch>
    );
  }
}
