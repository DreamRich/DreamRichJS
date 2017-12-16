import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import PatrimonyForm from './form/PatrimonyForm';
import IncomeForm from './form/IncomeForm';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import PatrimonyStore from '../stores/PatrimonyStore';

export default class IncomeSubStepper extends React.Component {

  static propTypes = {
    stepsNumber: PropTypes.number,
    patrimony: PropTypes.shape({
      id: PropTypes.number,
    }),
    incomes: PropTypes.array,
    canSubmit: PropTypes.bool,
  }

  state = {stepIndex: 0}

  componentWillMount = () => this.setState({
    listener: PatrimonyStore.addListener(this.handleChange),
    id: PatrimonyStore.getState().patrimony.id
  })

  handleChange = () => {
    // Only get some attributes from store
    const { stepIndex, patrimony: {id} } = PatrimonyStore.getState();
    if (stepIndex < this.props.stepsNumber || stepIndex >= 0) {
      this.setState({stepIndex, id});
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

  handleNext = () => {
    // Only go to next form if have more steps :)
    const {stepIndex} = this.state;
    if (stepIndex < this.props.stepsNumber) {
      AppDispatcher.dispatch({
        action: ActionType.PATRIMONY.SUBMIT,
        canSubmit: true,
      });
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
        { step < this.props.stepsNumber - 1 && this.state.id !== undefined && <RaisedButton
          label="Próximo formulário"
          primary={true}
          onClick={this.handleNext.bind(this, step)}
          style={{float: 'right'}}
        />}
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
      {text: 'FGTS',
        formComponent:
          <PatrimonyForm
            data={this.props.patrimony}
            canSubmit={this.props.canSubmit}
          />
      },
      {text: 'Receitas',
        formComponent:
          <IncomeForm
            id={this.props.patrimony.id}
          />
      }
    ];
    // Only enable click in some step if have the dependency of main form
    // this is a id in the state
    const stepsList = listInformationSteps.map((obj, index) => {
      return (
        <Step key={obj.text} disabled={this.props.patrimony.id === undefined}>
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
