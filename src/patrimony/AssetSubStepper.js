import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import RealeStateForm from './form/RealeStateForm.js';
import CompanyParticipationForm from './form/CompanyParticipationForm';
import ArrearageForm from './form/ArrearageForm';
import EquipmentForm from './form/EquipmentForm';
import PatrimonyStore from '../stores/PatrimonyStore';
import ActiveForm from './form/ActiveForm';

export default class AssetSubStepper extends React.Component {

  static propTypes = {
    stepsNumber: PropTypes.number,
    realestates: PropTypes.array,
    companyparticipations: PropTypes.array,
    equipments: PropTypes.array,
    manager: PropTypes.object,
    actives: PropTypes.array,
    arrearages: PropTypes.array,
    canSubmit: PropTypes.bool,
    id: PropTypes.number,
    types: PropTypes.array,
  }

  state = {stepIndex: 0}

  componentWillMount = () => {
    this.setState({
      listener: PatrimonyStore.addListener(this.handleChange)
    });
  }

  handleChange = () => {
    // Only get some attributes from store
    const { stepIndex } = PatrimonyStore.getState();
    if (stepIndex < this.props.stepsNumber || stepIndex >= 0) {
      this.setState({stepIndex});
    } else {
      this.setStep(this.state.stepIndex);
    }
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
    AppDispatcher.dispatch({
      action: ActionType.PATRIMONY.SETSTEP,
      stepIndex: 0
    });
  }

  handleNext = (step) => {
    // Only go to next form if have more steps :)
    const {stepIndex} = this.state;
    if (stepIndex < this.props.stepsNumber) {
      this.setStep(step+1);
    }
  };

  handlePrev = () => {
    this.setStep(this.state.stepIndex-1);
  };

  setStep = (stepIndex) => AppDispatcher.dispatch({
    action: ActionType.PATRIMONY.SETSTEP,
    stepIndex: stepIndex
  })

  renderStepActions(step) {
    // To reduce the lines of code amount of getContentSteps
    return (
      <div style={{margin: '12px 0'}}>
        {step < this.props.stepsNumber-1 && (<RaisedButton
          label="Próximo formulário"
          primary={true}
          onClick={this.handleNext.bind(this, step)}
          style={{float: 'right'}}
        />)}
        {step > 0 && (
          <RaisedButton
            label="Formulário anterior"
            onClick={this.handlePrev}
            style={{float: 'left'}}
          />
        )}
      </div>
    );
  }

  getContentSteps(){
    const listInformationSteps = [
      {text: 'Bem imóvel',
        formComponent: <RealeStateForm
          id={this.props.id}
        />
      },
      {text: 'Participação em empresa',
        formComponent: <CompanyParticipationForm
          id={this.props.id}
        />
      },
      {text: 'Equipamento',
        formComponent: <EquipmentForm
          id={this.props.id}
        />
      },
      {text: 'Ativo',
        formComponent: <ActiveForm
          id={this.props.id}
        />
      },
      {text: 'Dívidas',
        formComponent: <ArrearageForm
          id={this.props.id}
          rows={this.props.arrearages}
        />
      },
    ];
    // Only enable click in some step if have the dependency of main form
    // this is a id in the state
    const stepsList = listInformationSteps.map((obj, index) => {
      return (
        <Step key={obj.text} disabled={this.props.id === undefined}>
          <StepButton onClick={() => this.setStep(index)}>
            {obj.text}
          </StepButton>
          <StepContent>
            {obj.formComponent}
            {this.renderStepActions(index)}
          </StepContent>
        </Step>
      );
    });
    return stepsList;
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <Stepper
        activeStep={stepIndex}
        linear={false}
        orientation="vertical"
      >
        {this.getContentSteps()}
      </Stepper>
    );
  }
}
