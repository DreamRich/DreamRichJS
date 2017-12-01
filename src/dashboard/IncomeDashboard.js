import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import PatrimonyStore from '../stores/PatrimonyStore';
import '../stylesheet/RegisterForms.sass';
// import { Row, Col } from 'react-flexbox-grid';
// import MediaQuery from 'react-responsive';
// import getDivider from '../utils/getDivider';
import Dashboard from '../components/Dashboard';
// import PatrimonyForm from '../patrimony/PatrimonyForm';
import IncomeForm from '../patrimony/IncomeForm';

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
