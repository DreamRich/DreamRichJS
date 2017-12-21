import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../stylesheet/RegisterForms.sass';
import ProtectionStore from '../stores/ProtectionStore';
import '../stylesheet/RegisterForms.sass';
import SubStepperProtection from './SubStepperProtection';
import {postProtectionManager} from '../resources/saveModels';
import SuccessionForm from './form/SuccessionForm';

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
        text: 'Custos de sucessão',
        formComponent:
          <SuccessionForm
            id={this.state.protection_manager.id}
            actual={actual_patrimony_succession}
            future={future_patrimony_succession}
            disabled={actual_patrimony_succession !== undefined &&
              future_patrimony_succession !== undefined}
          />,
        nextButton: true,
      },{
        text: 'Reserva de emergência 2',
        formComponent:
          <div key={3} disabled={true}> oi </div>,
        nextButton: true,
      },{
        text: 'Reserva de emergência3 ',
        formComponent:
          <div key={4} disabled={true}> oi </div>,
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
