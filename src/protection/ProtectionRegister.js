import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../stylesheet/RegisterForms.sass';
import ProtectionStore from '../stores/ProtectionStore';
import '../stylesheet/RegisterForms.sass';
import SubStepperProtection from './SubStepperProtection';
import {postProtectionManager} from '../resources/saveModels';
import {ActualPatrimonySuccessionForm, FuturePatrimonySuccessionForm} from './form/SuccessionForm';
import PrivatePensionForm from './form/PrivatePensionForm';
import ReserveInLackForm from './form/ReserveInLackForm';

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
        text: 'Reserva de emergência',
        formComponent:
          <div key={1} disabled={true}> oi </div>,
        nextButton: true,
      },{
        text: 'Custos de sucessão hoje',
        formComponent:
          <ActualPatrimonySuccessionForm
            id={this.state.protection_manager.id}
            data={actual_patrimony_succession}
            disabled={actual_patrimony_succession !== undefined}
          />,
        nextButton: true,
      },{
        text: 'Custos de sucessão futuro',
        formComponent:
          <FuturePatrimonySuccessionForm
            id={this.state.protection_manager.id}
            data={future_patrimony_succession}
            disabled={future_patrimony_succession !== undefined}
          />,
        nextButton: true,
      },{
        text: 'Patrimônio para família',
        formComponent:
          <ReserveInLackForm
            id={this.state.protection_manager.id}
            data={this.state.reserve_in_lack}
            disabled={this.state.reserve_in_lack !== undefined}
          />,
        nextButton: true,
      },{
        text: 'Previdência privada',
        formComponent:
          <PrivatePensionForm
            id={this.state.protection_manager.id}
            disabled={true}
            data={this.state.private_pension}
          />,
        nextButton: true,
      },{
        text: 'Reserva de emergência 5',
        formComponent:
          <div key={5} disabled={true}> oi </div>,
        nextButton: true,
      },
    ];

    console.log(this.state.protection_manager.id);
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
