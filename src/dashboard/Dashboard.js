import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ClientDashboard from '../dashboard/ClientDashboard';
import RegularCostDashboard from '../dashboard/RegularCostDashboard';
import PropTypes from 'prop-types';
import {getFinancialPlanning} from '../resources/getModels';
import RegisterStore from '../stores/RegisterStore';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import ObjectIcon from 'material-ui/svg-icons/device/gps-fixed';
import SecurityIcon from 'material-ui/svg-icons/hardware/security';
import MoneyIconSecundary from 'material-ui/svg-icons/editor/monetization-on';
import BusinessIcon from 'material-ui/svg-icons/communication/business';

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

  getListDashboard(listDashboardsTabs){
    const dashboardTabs = listDashboardsTabs.map((dashboard,index) => {
      return (
        <Tab
          label={dashboard.label}
          icon={dashboard.icon}
          key={'tabsDashboards'+index}
        >
          <div className="marginTop">
            {dashboard.dashboard}
          </div>
        </Tab>
      );
    });

    return dashboardTabs;
  }

  render () {
    const listDashboardsTabs = [
      {
        label: 'Informações Básicas',
        icon: <InfoOutline className="material-icons"/>,
        dashboard: <ClientDashboard />
      },
      {
        label: 'Custos Fixos',
        icon: <MoneyIcon className="material-icons"/>,
        dashboard: <RegularCostDashboard />
      },
      {
        label: 'Objetivos',
        icon: <ObjectIcon className="material-icons"/>,
      },
      {
        label: 'Renda',
        icon: <MoneyIconSecundary className="material-icons"/>,
      },
      {
        label: 'Patrimônio',
        icon: <BusinessIcon className="material-icons"/>,
      },
      {
        label: 'Proteção',
        icon: <SecurityIcon className="material-icons"/>,
      },
    ];

    return (
      <Tabs>
        {this.getListDashboard(listDashboardsTabs)}
      </Tabs>
    );
  }
}


export default Dashboard;
