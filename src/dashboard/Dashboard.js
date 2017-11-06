import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ClientDashboard from '../dashboard/ClientDashboard';
import RegularCostDashboard from '../dashboard/RegularCostDashboard';
import PropTypes from 'prop-types';
import {getFinancialPlanning} from '../resources/getModels';
import RegisterStore from '../stores/RegisterStore';

class Dashboard extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    if (id) {
      getFinancialPlanning(id);
    }
  }

  state = RegisterStore.getState()

  render () {
    return (
      <Tabs>
        <Tab label="Informações básicas" >
          <div style={{marginTop: '20px'}}>
            <ClientDashboard />
          </div>
        </Tab>
        <Tab label="Custos fixos" >
          <div style={{marginTop: '20px'}}>
            <RegularCostDashboard />
          </div>
        </Tab>
        <Tab
          label="Objetivos"
          data-route="/home"
        >
          <div>
          </div>
        </Tab>
      </Tabs>
    );
  }
}


export default Dashboard;
