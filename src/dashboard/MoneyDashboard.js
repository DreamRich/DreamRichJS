import React, {Component} from 'react';
import Dashboard from '../components/Dashboard';
import RegularCostRegister from '../cost/RegularCostRegister';
import IncomeDashboard from '../dashboard/IncomeDashboard';

export default class MoneyDashboard extends Component {
  render = () => {
    return (
      <Dashboard>
        <RegularCostRegister size={6} />
        <IncomeDashboard size={6} />
      </Dashboard>
    );
  }
}
