import React, {Component} from 'react';
import PatrimonyStore from '../stores/PatrimonyStore';
import '../stylesheet/RegisterForms.sass';
import Dashboard from '../components/Dashboard';
import RealeStateForm from '../patrimony/form/RealeStateForm.js';
import CompanyParticipationForm from '../patrimony/form/CompanyParticipationForm';
import ArrearageForm from '../patrimony/form/ArrearageForm';
import EquipmentForm from '../patrimony/form/EquipmentForm';
import ActiveForm from '../patrimony/form/ActiveForm';
import ArrearageDashboard from '../arrearage/ArrearageDashboard';
import ActiveChart from '../patrimony/ActiveChart';

class PatrimonyDashboard extends Component {

  state = {...PatrimonyStore.getState(), size: 3}

  componentWillMount = () => {
    this.setState({
      listener: PatrimonyStore.addListener(this.handleChange)
    });
  }

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => this.setState({...PatrimonyStore.getState()})

  arrearageTable = (size) => {
    this.setState({size});
  }

  render = () => {
    return (
      <Dashboard>
        <ActiveChart id={this.state.patrimony.id} size={12} />
        <ActiveForm
          id={this.state.patrimony.id}
          size={12}
        />
        <ArrearageForm
          id={this.state.patrimony.id}
          rows={this.state.arrearages}
          size={12}
        />
        <ArrearageDashboard
          id={this.state.patrimony.id}
          size={this.state.size}
          sizeDashboard={this.arrearageTable}
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
