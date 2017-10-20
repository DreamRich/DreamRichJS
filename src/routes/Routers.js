import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import LogoutButton from '../auth/LogoutButton';
import PasswordForm from '../auth/form/PasswordForm';
import ResetForm from '../auth/ResetForm';
import {AuthorizedRoute, NotFoundRoute} from './Router';
import ClientTable from '../client/ClientTable';
import Employeer from '../employee/Employeer';
import PatrimonyRegister from '../patrimony/PatrimonyRegister';
import ClientRegister from '../client/ClientRegister';
import FixedCostRegister from '../client/FixedCostRegister';
import {Auth} from '../auth/Auth';
import GoalChart from '../goal/GoalChart';
import GoalRegister from '../client/GoalRegister';
import ActiveRegister from '../patrimony/ActiveRegister';

export default class Routers extends Component{

  render(){
    return (
      <Switch>
        <Route exact path="/" render={ () => <h1>Home</h1> } />
        <AuthorizedRoute exact permission="change_own_client_data" path="/register/fixed_cost" component={ FixedCostRegister } />
        <AuthorizedRoute exact permission="change_own_client_data" path="/register/goal" component={ GoalRegister } />
        <AuthorizedRoute exact permission="change_own_client_data" path="/register/active" component={ ActiveRegister } />
        <AuthorizedRoute exact permission="change_own_client_data" path="/register/patrimony" component={ PatrimonyRegister } />
        <AuthorizedRoute exact permission="see_all_basic_client_data" path="/client" component={ ClientTable } />
        <AuthorizedRoute permission="see_employee_data" path="/employee" component={ Employeer } />
        <Route exact path="/login" component={ LoginPage } />
        <AuthorizedRoute permission="change_own_client_data" exact path="/register/client" component={ ClientRegister } />
        <Route path="/logout" component={ LogoutButton } />
        <AuthorizedRoute permission="allow_any" path="/login/changepassword" render={ () => <PasswordForm userid={Auth.getUserId()} username={Auth.getUserName()} /> } />
        <AuthorizedRoute permission="allow_any" path="/goals" component={ GoalChart } />

        <Route path="/login/resetpassword" render={ () => <ResetForm email="marcelohpf@hotmail.com" /> } />
        <Route component={ NotFoundRoute } />
      </Switch>
    );
  }
}
