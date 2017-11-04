import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginPage from '../auth/LoginPage';
import PasswordForm from '../auth/form/PasswordForm';
import ResetForm from '../auth/ResetForm';
import {AuthorizedRoute, NotFoundRoute} from './Router';
import ClientTable from '../client/ClientTable';
import Employeer from '../employee/Employeer';
import PatrimonyRegister from '../patrimony/PatrimonyRegister';
import ClientRegister from '../client/ClientRegister';
import ClientDashboard from '../client/ClientDashboard';
import StepperClient from '../client/StepperClient';
import {Auth} from '../auth/Auth';
import GoalChart from '../goal/GoalChart';
import GoalRegister from '../client/GoalRegister';
import ActiveRegister from '../patrimony/ActiveRegister';
import ActiveProfit from '../patrimony/ActiveProfit';
import Home from '../Home';

export default class Routers extends Component{

  render(){
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/login" component={ LoginPage } />
        <AuthorizedRoute exact permission="change_own_client_data" path="/register/goal" component={ GoalRegister } />
        <AuthorizedRoute exact permission="change_own_client_data" path="/register/active" component={ ActiveRegister } />
        <AuthorizedRoute exact permission="change_own_client_data" path="/register/patrimony" component={ PatrimonyRegister } />
        <AuthorizedRoute exact permission="change_own_client_data" path="/patrimony/active/:id" component={ ActiveProfit } />
        <AuthorizedRoute exact permission="see_all_basic_client_data" path="/client" component={ ClientTable } />
        <AuthorizedRoute permission="see_employee_data" path="/employee" component={ Employeer } />
        <Route exact path="/login" component={ LoginPage } />
        <AuthorizedRoute permission="change_own_client_data" exact path="/register/client" component={ ClientRegister } />

        <AuthorizedRoute permission="change_own_client_data" exact path="/dashboard/:id" component={ ClientDashboard } />

        <AuthorizedRoute permission="change_own_client_data" exact path="/register/steps/:id?" component={ StepperClient } />
        <AuthorizedRoute permission="allow_any" path="/goals" component={ GoalChart } />
        <AuthorizedRoute permission="allow_any" path="/login/changepassword" 
          render={ () => <PasswordForm userid={Auth.getUserId()} username={Auth.getUserName()} /> } />

        <Route path="/login/resetpassword" render={ () => <ResetForm email="marcelohpf@hotmail.com" /> } />
        <Route component={ NotFoundRoute } />
      </Switch>
    );
  }
}
