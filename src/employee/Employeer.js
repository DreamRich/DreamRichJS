import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CommonTable from './CommonTable';
import FinancialTable from './FinancialTable';
import {Route, Switch} from 'react-router-dom';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';


export default class Employeer extends Component {

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <RaisedButton label={<Link to="/employee/common">Common</Link>} />
            <RaisedButton label={<Link to="/employee/financial">Financial</Link>} />
          </ToolbarGroup>
        </Toolbar>

        <Switch>
          <Route exact path="/employee/financial" component={FinancialTable} />
          <Route exact path="/employee/common" component={CommonTable} />
        </Switch>
      </div>
    );
  }
}
