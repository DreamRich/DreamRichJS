import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ClientRegister from '../client/ClientRegister';
import RegularCostRegister from '../client/RegularCostRegister';
import GoalRegister from '../client/GoalRegister';
import PatrimonyRegister from '../patrimony/PatrimonyRegister';
import PropTypes from 'prop-types';
// import AppDispatcher from '../AppDispatcher';
// import ActionType from '../actions/ActionType';
import {getFinancialPlanning} from '../resources/getModels';
import RegisterStore from '../stores/RegisterStore';

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
 
    this.forms = [
      <ClientRegister key={1} />,
      <RegularCostRegister key={2} />,
      <div key={3} >Renda para fora de patrimonio</div>,
      <PatrimonyRegister key={4} />,
      <div key={5} >Proteção </div>,
      <GoalRegister key={6} />];
  }

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    if (id) {
      getFinancialPlanning(id);
    }
  }

  state = RegisterStore.getState()

  getStepContent(stepIndex) {
    const maxSteps = this.forms.length;
    return this.forms[stepIndex % maxSteps];
  }

  handleNext = () => {
    const {stepIndex} = this.state;

    if (stepIndex < 6) {
      this.setState({stepIndex: stepIndex + 1});
    }
  }

  handlePrev = () => {
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
          {stepIndex > 0 &&
            <FlatButton
              label="Voltar para o passo anterior"
              onClick={this.handlePrev}
              backgroundColor='#ebebeb'
              style={{float: 'left'}}
            />
          }
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
