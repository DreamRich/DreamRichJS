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
  }

  handleChange = () => {
    const { stepIndex } = ClientStore.getState();
    if (stepIndex < this.props.stepsNumber || stepIndex >= 0) {
      this.setState({stepIndex});
    } else {
      this.setStep(this.state.stepIndex);
    }
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleNext = () => {
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
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Salvar as informações deste formulário"
          primary={true}
          onClick={this.handleNext.bind(this, step)}
          style={{float: 'right'}}
        />
        {step > 0 && (
          <RaisedButton
            label="Voltar para o formulário anterior"
            onClick={this.handlePrev}
            style={{float: 'left'}}
          />
        )}
      </div>
    );
  }

  getContentSteps(){
    let stepsList = [];
    stepsList = this.props.listInformationSteps.map((obj, index) => {
      return(
        <Step key={obj.text}>
          <StepButton onClick={() => this.setState({stepIndex: index})}>
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
