import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ClientDashboard from '../dashboard/ClientDashboard';
import GoalDashboard from '../dashboard/GoalDashboard';
// import IncomeDashboard from '../dashboard/IncomeDashboard';
import PatrimonyDashboard from '../dashboard/PatrimonyDashboard';
import MoneyDashboard from '../dashboard/MoneyDashboard';
// import RegularCostRegister from '../cost/RegularCostRegister';
import PropTypes from 'prop-types';
import {getFinancialPlanning} from '../resources/getModels';
import RegisterStore from '../stores/RegisterStore';
import InfoOutline from 'material-ui/svg-icons/action/info-outline';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import ObjectIcon from 'material-ui/svg-icons/device/gps-fixed';
import SecurityIcon from 'material-ui/svg-icons/hardware/security';
//import MoneyIconSecundary from 'material-ui/svg-icons/editor/monetization-on';
import BusinessIcon from 'material-ui/svg-icons/communication/business';
import { withRouter } from 'react-router';

class Dashboard extends Component {

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
        tab: PropTypes.string,
      }),
    }),
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentWillMount = () => {
    const id = this.props.match.params.id;
    if (id) {
      getFinancialPlanning(id);
    }
    const tab = this.props.match.params.tab;
    this.setState({
      tab: tab,
      listener: RegisterStore.addListener(this.handleChange)
    });
  }

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => this.setState({...RegisterStore.getState()})

  state = {...RegisterStore.getState(), tab: 'basic' }

  getListDashboard = (listDashboardsTabs) => {
    const dashboardTabs = listDashboardsTabs.map((dashboard,index) => {
      return (
        <Tab
          label={dashboard.label}
          icon={dashboard.icon}
          key={'tabsDashboards'+index}
          data-route={dashboard.route}
          value={dashboard.value}
        >
          <div className="marginTop">
            {dashboard.dashboard}
          </div>
        </Tab>
      );
    });

    return dashboardTabs;
  }

  changeTab = (tab) => {
    this.props.history.replace(tab);
    this.setState({tab});
  }

  render () {

    let id = this.props.match.params.id;
    id = id ? Number(id) : undefined;

    const listDashboardsTabs = [
      {
        label: 'Informações Básicas',
        icon: <InfoOutline className="material-icons"/>,
        dashboard: <ClientDashboard />,
        value: 'basico',
      },
      {
        label: 'Fluxo da renda',
        icon: <MoneyIcon className="material-icons"/>,
        dashboard: <MoneyDashboard />,
        value: 'custo',
      },
      {
        label: 'Objetivos',
        icon: <ObjectIcon className="material-icons"/>,
        dashboard: <GoalDashboard
          id={id}
          patrimony_id={this.state.financialPlanning.patrimony_id}
          cost_manager_id={this.state.financialPlanning.cost_manager_id}
        />,
        value: 'objetivo',
      },
      {
        label: 'Patrimônio',
        icon: <BusinessIcon className="material-icons"/>,
        dashboard: <PatrimonyDashboard />,
        value: 'patrimonio',
      },
      {
        label: 'Proteção',
        icon: <SecurityIcon className="material-icons"/>,
        value: 'protecao',
      },
    ];

    return (
      <Tabs value={this.state.tab} onChange={this.changeTab}>
        {this.getListDashboard(listDashboardsTabs)}
      </Tabs>
    );
  }
}


export default withRouter(Dashboard);
