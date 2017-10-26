import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';

export default class SubStepperClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepsNumber: this.props.stepsNumber,
      listInformationSteps: this.props.listInformationSteps,
      stepIndex: 0
    };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  static propTypes = {
    stepsNumber: PropTypes.number,
    listInformationSteps: PropTypes.array,
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < this.state.stepsNumber) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label="Salvar as informações deste formulário"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{float: 'right'}}
        />
        {step > 0 && (
          <RaisedButton
            label="Voltar para o formulário anterior"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
            backgroundColor='#ebebeb'
            style={{float: 'left'}}
          />
        )}
      </div>
    );
  }

  getContentSteps(){
    let stepsList = [];
    stepsList = this.state.listInformationSteps.map((obj, index) => {
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
