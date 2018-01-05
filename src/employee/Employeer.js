import React, {Component} from 'react';
import CommonTable from './CommonTable';
import FinancialTable from './FinancialTable';
import {Route, Switch} from 'react-router-dom';

export default class Employeer extends Component {

  render = () => {
    return (
      <div>
        <Switch>
          <Route exact path="/employee/financial" component={FinancialTable} />
          <Route exact path="/employee/common" component={CommonTable} />
        </Switch>
      </div>
    );
  }
}
