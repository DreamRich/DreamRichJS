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
// import ActionType from '../actions/ActionType';

const SubStepper = (stepAction) => {
  return class VerticalStepper extends React.Component {
    static propTypes = {
      stepsNumber: PropTypes.number,
      steps: PropTypes.array,
      stepIndex: PropTypes.number,
    }

    handleNext = () => {
      // Only go to next form if have more steps :)
      this.setStep(this.props.stepIndex+1);
    };

    handlePrev = () => {
      this.setStep(this.props.stepIndex-1);
    }

    setStep = (stepIndex) => AppDispatcher.dispatch({
      action: stepAction,
      stepIndex: stepIndex,
    })

    renderStepActions = (step, item) => {
      // To reduce the lines of code amount of getContentSteps
      return (
        <div style={{margin: '12px 0'}}>
          {step < this.props.stepsNumber - 1 && item.props.disabled && <RaisedButton
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

    getContentSteps = () => {
      // Only enable click in some step if have the dependency of main form
      // this is a id in the state
      const stepsList = this.props.steps.map((obj, index) => {
        return(
          <Step key={obj.text} >
            <StepButton onClick={() => this.setStep(index)}>
              {obj.text}
            </StepButton>
            <StepContent>
              {obj.formComponent}
              {this.renderStepActions(index, obj.formComponent)}
            </StepContent>
          </Step>
        );}
      );
      return stepsList;
    }

    render() {
      return (
        <Stepper
          activeStep={this.props.stepIndex}
          linear={false}
          orientation="vertical"
        >
          {this.getContentSteps()}
        </Stepper>
      );
    }
  };
};

export default SubStepper;
