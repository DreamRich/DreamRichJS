import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../stylesheet/RegisterForms.sass';
import ProtectionStore from '../stores/ProtectionStore';
import {postProtectionManager} from '../resources/saveModels';
import {ActualPatrimonySuccessionForm, FuturePatrimonySuccessionForm} from '../protection/form/SuccessionForm';
import PrivatePensionForm from '../protection/form/PrivatePensionForm';
import ReserveInLackForm from '../protection/form/ReserveInLackForm';
import LifeInsuranceForm from '../protection/form/LifeInsuranceForm';
import EmergencyForm from '../protection/form/EmergencyForm';
import Dashboard from '../components/Dashboard';

export default class ProtectionRegister extends Component {

  static propTypes = {
    id: PropTypes.number,
  }

  state = ProtectionStore.getState()

  componentWillMount = () => {
    this.setState({
      listener: ProtectionStore.addListener(this.handleChange)
    });
    const {protection_manager} = ProtectionStore.getState();
    if (protection_manager && protection_manager.id === undefined) {
      postProtectionManager(this.props.id);
    }
  }


  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => this.setState(ProtectionStore.getState())

  render() {
    const {
      actual_patrimony_succession,
      future_patrimony_succession
    } = this.state;
    const listInformationSteps = [
      <ActualPatrimonySuccessionForm
        key='ActualPatrimonySuccessionForm'
        id={this.state.protection_manager.id}
        data={actual_patrimony_succession}
        disabled={true}
        size={6}
      />,
      <FuturePatrimonySuccessionForm
        key='FuturePatrimonySuccessionForm'
        id={this.state.protection_manager.id}
        data={future_patrimony_succession}
        disabled={true}
        size={6}
      />,
      <EmergencyForm
        key='emergency_form'
        data={this.state.emergency_reserve}
        disabled={!this.state.emergency_reserve_id}
        size={6}
      />,
      <ReserveInLackForm
        key='ReserveInLackForm'
        id={this.state.protection_manager.id}
        data={this.state.reserve_in_lack}
        disabled={true}
        size={6}
      />,
      <PrivatePensionForm
        key='PrivatePensionForm'
        id={this.state.protection_manager.id}
        disabled={true}
        size={12}
      />,
      <LifeInsuranceForm
        key='LifeInsuranceForm'
        id={this.state.protection_manager.id}
        size={12}
      />,
    ];

    return (
      <Dashboard>
        {listInformationSteps}
      </Dashboard>
    );
  }
}
