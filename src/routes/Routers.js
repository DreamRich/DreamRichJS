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
        <AuthorizedRoute permission="see_all_basic_client_data" exact path="/client" component={ ClientTable } />
        <AuthorizedRoute permission="see_employee_data" path="/employee" component={ Employeer } />
        <Route exact path="/login" component={ LoginPage } />
        <AuthorizedRoute permission="change_own_client_data" exact path="/register/client" component={ ClientRegister } />
        <Route path="/logout" component={ LogoutButton } />
        <AuthorizedRoute permission="allow_any" path="/login/changepassword" render={ () => <PasswordForm userid={Auth.getUserId()} username={Auth.getUserName()} /> } />
        <Route path="/login/resetpassword" render={ () => <ResetForm email="marcelohpf@hotmail.com" /> } />
        <Route path="/patrimony" component={ PatrimonyForm } />
        <Route component={ NotFoundRoute } />
      </Switch>
    );
  }
}
