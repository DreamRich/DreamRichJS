import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../stylesheet/RegisterForms.sass';
import ProtectionStore from '../stores/ProtectionStore';
import SubStepperProtection from './SubStepperProtection';
import {postProtectionManager} from '../resources/saveModels';
import {ActualPatrimonySuccessionForm, FuturePatrimonySuccessionForm} from './form/SuccessionForm';
import PrivatePensionForm from './form/PrivatePensionForm';
import ReserveInLackForm from './form/ReserveInLackForm';
import LifeInsuranceForm from './form/LifeInsuranceForm';
import EmergencyForm from './form/EmergencyForm';

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
      {
        text: 'Proteção falta de renda',
        formComponent:
          <EmergencyForm
            data={this.state.emergency_reserve}
            disabled={!this.state.emergency_reserve_id}
          />,
        nextButton: true,
      },{
        text: 'Custos de sucessão hoje',
        formComponent:
          <ActualPatrimonySuccessionForm
            id={this.state.protection_manager.id}
            data={actual_patrimony_succession}
            disabled={true}
          />,
        nextButton: true,
      },{
        text: 'Custos de sucessão futuro',
        formComponent:
          <FuturePatrimonySuccessionForm
            id={this.state.protection_manager.id}
            data={future_patrimony_succession}
            disabled={true}
          />,
        nextButton: true,
      },{
        text: 'Patrimônio para família',
        formComponent:
          <ReserveInLackForm
            id={this.state.protection_manager.id}
            data={this.state.reserve_in_lack}
            disabled={true}
          />,
        nextButton: true,
      },{
        text: 'Previdência privada',
        formComponent:
          <PrivatePensionForm
            id={this.state.protection_manager.id}
            disabled={true}
          />,
        nextButton: true,
      },{
        text: 'Seguro de vida',
        formComponent:
          <LifeInsuranceForm
            id={this.state.protection_manager.id}
          />,
        nextButton: true,
      },
    ];

    return (
      <div style={{width:'auto'}}>
        <SubStepperProtection
          stepsNumber={listInformationSteps.length}
          steps={listInformationSteps}
          stepIndex={this.state.stepIndex}
        />
      </div>
    );
  }
}
