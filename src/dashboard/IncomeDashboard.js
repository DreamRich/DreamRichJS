import React, {Component} from 'react';

import PatrimonyStore from '../stores/PatrimonyStore';
import '../stylesheet/RegisterForms.sass';



import Dashboard from '../components/Dashboard';

import IncomeForm from '../patrimony/form/IncomeForm';

class IncomeDashboard extends Component {

  state = PatrimonyStore.getState()

  componentWillMount = () => {
    this.setState({
      listener: PatrimonyStore.addListener(this.handleChange)
    });
  }

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => this.setState(PatrimonyStore.getState())

  render() {
    return (
      <Dashboard>
        <IncomeForm id={this.state.patrimony.id} size={12} />
      </Dashboard>
    );
  }
}

export default IncomeDashboard;
