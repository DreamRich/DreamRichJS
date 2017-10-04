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
import FixedCostRegister from '../client/FixedCostRegister';
import {Auth} from '../auth/Auth';

export default class Routers extends Component{

  render(){
    return (
      <Switch>
        <Route exact path="/" render={ () => <h1>Home</h1> } />
        <AuthorizedRoute path="/login/changepassword" permission="allow_any"  render={ () => <PasswordForm userid={Auth.getUserId()} username={Auth.getUserName()} /> } />
        <AuthorizedRoute path="/register/client" permission="change_own_client_data" exact component={ ClientRegister } />
        <AuthorizedRoute path="/register/fixed_cost" permission="change_own_client_data" exact component={ FixedCostRegister } />
        <AuthorizedRoute path="/client" permission="see_all_basic_client_data" exact component={ ClientTable } />
        <AuthorizedRoute path="/employee" permission="see_employee_data" component={ Employeer } />
        <Route path="/login" exact component={ LoginPage } />
        <Route path="/login/resetpassword" render={ () => <ResetForm email="marcelohpf@hotmail.com" /> } />
        <Route path="/logout" component={ LogoutButton } />
        <Route path="/patrimony" component={ PatrimonyForm } />
        <Route component={ NotFoundRoute } />
      </Switch>
    );
  }
}
