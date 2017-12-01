import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import PatrimonyStore from '../stores/PatrimonyStore';
import '../stylesheet/RegisterForms.sass';
// import { Row, Col } from 'react-flexbox-grid';
// import MediaQuery from 'react-responsive';
// import getDivider from '../utils/getDivider';
import Dashboard from '../components/Dashboard';
// import PatrimonyForm from '../patrimony/PatrimonyForm';
import RealeStateForm from '../patrimony/RealeStateForm.js';
import CompanyParticipationForm from '../patrimony/CompanyParticipationForm';
import ArrearageForm from '../patrimony/ArrearageForm';
import EquipmentForm from '../patrimony/EquipmentForm';
import ActiveForm from '../patrimony/ActiveForm';

class PatrimonyDashboard extends Component {

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
        <ActiveForm
          id={this.state.patrimony.id}
          size={12}
        />
        <ArrearageForm
          id={this.state.patrimony.id}
          rows={this.state.arrearages}
          size={12}
        />
        <RealeStateForm
          id={this.state.patrimony.id}
          size={9}
        />
        <CompanyParticipationForm
          id={this.state.patrimony.id}
          size={6}
        />
        <EquipmentForm
          id={this.state.patrimony.id}
          size={6}
        />
      </Dashboard>
    );
  }
}

export default PatrimonyDashboard;
