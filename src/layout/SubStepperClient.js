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
import ClientStore from '../stores/ClientStore';

export default class SubStepperClient extends React.Component {

  constructor(props) {
    super(props);
    this.state = ClientStore.getState();
  }

  static propTypes = {
    stepsNumber: PropTypes.number,
    listInformationSteps: PropTypes.array,
  }

  componentWillMount = () => {
    this.setState({listener: ClientStore.addListener(this.handleChange)});
    AppDispatcher.dispatch({
      action: ActionType.CLIENT.SETSTEP,
      stepIndex: 0
    });
  }

  handleChange = () => {
    // Only get some attributes from store
    const { stepIndex, active_client: {id} } = ClientStore.getState();
    if (stepIndex < this.props.stepsNumber || stepIndex >= 0) {
      this.setState({stepIndex, id});
    } else {
      this.setStep(this.state.stepIndex);
    }
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleNext = () => {
    // Only go to next form if have more steps :)
    let {stepIndex} = this.state;
    if (stepIndex < this.props.stepsNumber) {
      AppDispatcher.dispatch({
        action: ActionType.CLIENT.SUBMIT,
        canSubmit: true,
      });
    }
  };

  handlePrev = () => {
    this.setStep(this.state.stepIndex-1);
  };

  setStep = (stepIndex) => AppDispatcher.dispatch({
    action: ActionType.CLIENT.SETSTEP,
    stepIndex: stepIndex
  })

  renderStepActions(step) {
    // To reduce the lines of code amount of getContentSteps
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Salvar e próximo"
          primary={true}
          onClick={this.handleNext.bind(this, step)}
          style={{float: 'right'}}
        />
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
    let stepsList = [];
    // Only enable click in some step if have the dependency of main form
    // this is a id in the state
    stepsList = this.props.listInformationSteps.map((obj, index) => {
      return(
        <Step key={obj.text} disabled={this.state.id === undefined}>
          <StepButton onClick={() => this.setStep(index)}>
            {obj.text}
          </StepButton>
          <StepContent>
            {obj.formComponent}
            {this.renderStepActions(index)}
          </StepContent>
        </Step>
      );}
    );
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
