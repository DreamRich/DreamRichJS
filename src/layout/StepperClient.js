import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ClientRegister from '../client/ClientRegister';
import Paper from 'material-ui/Paper';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

class StepperClient extends React.Component {
  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  state = {
    stepIndex: 0,
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
    case 0:
      return (
        <ClientRegister />
      );

    case 1:
      return (
        <p>
        </p>
      );

    case 2:
      return (
        <p>
          {'2 form'}
        </p>
      );

    case 3:
      return (
        <p>
          {'3 form'}
        </p>
      );
    case 4:
      return (
        <p>
          {'4 form'}
        </p>
      );
    case 5:
      return (
        <p>
          {'5 form'}
        </p>
      );
    }
  }

  handleNext() {
    const {stepIndex} = this.state;

    if (stepIndex < 6) {
      this.setState({stepIndex: stepIndex + 1});
    }
  }

  handlePrev() {
    const {stepIndex} = this.state;

    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <div style={{width: '100%', maxWidth: '80%', margin: 'auto'}}>
        <Paper zDepth={1}>
          <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon />}>
            <Step>
              <StepLabel>Cadastro Básico</StepLabel>
            </Step>
            <Step>
              <StepLabel>Custos Fixos</StepLabel>
            </Step>
            <Step>
              <StepLabel>Renda</StepLabel>
            </Step>
            <Step>
              <StepLabel>Patrimônio</StepLabel>
            </Step>
            <Step>
              <StepLabel>Proteção</StepLabel>
            </Step>
            <Step>
              <StepLabel>Objetivos</StepLabel>
            </Step>
          </Stepper>
        </Paper>

        {this.getStepContent(stepIndex)}

        <div style={{marginBottom: '7%'}}>
          <FlatButton
            label="Voltar para o passo anterior"
            disabled={stepIndex === 0}
            onClick={this.handlePrev}
            backgroundColor='#ebebeb'
            style={{float: 'left'}}
          />
          <RaisedButton
            label={stepIndex === 6 ? 'Finalizar' : 'Seguir para o passo seguinte'}
            primary={true}
            onClick={this.handleNext}
            style={{float: 'right'}}
          />
        </div>
      </div>
    );
  }
}

export default StepperClient;
