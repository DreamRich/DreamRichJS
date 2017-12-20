import React, {Component} from 'react';
import Dashboard from '../components/Dashboard';
import IndependenceForm from '../independence/form/IndependenceForm';
import PlanningForm from '../independence/form/PlanningForm';
import ActiveProfit from '../patrimony/ActiveProfit';

export default class IndependenceDashboard extends Component {

  render = () => {
    return (
      <Dashboard>
        <ActiveProfit size={12} />
        <IndependenceForm size={6} disabled={true} />
        <PlanningForm size={6} disabled={true} />
      </Dashboard>
    );
  }
}
