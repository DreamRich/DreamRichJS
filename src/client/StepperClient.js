import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ClientRegister from '../client/ClientRegister';
import RegularCostRegister from '../client/RegularCostRegister';
import GoalRegister from '../client/GoalRegister';
import PatrimonyRegister from '../patrimony/PatrimonyRegister';
import PropTypes from 'prop-types';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import {getFinancialPlanning} from '../resources/getModels';
import RegisterStore from '../stores/RegisterStore';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import Paper from 'material-ui/Paper';
import getDivider from '../utils/getDivider';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

class StepperClient extends React.Component {
  constructor(props) {
    super(props);

    this.forms = [
      <ClientRegister key={1} />,
      <RegularCostRegister
        titleCard="Custo fixo"
        subtitleCard="Insira o(s) valor(es) do(s) custo(s) fixo(s)"
        key={2}
      />,
      <PatrimonyRegister key={3} />,
      <PatrimonyRegister key={4} main={false}/>,
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
    } else {
      AppDispatcher.dispatchDefer({
        action: ActionType.RESETFORMSTORES
      });
    }
  }

  state = RegisterStore.getState()

  getStepContent(stepIndex) {
    const maxSteps = this.forms.length;
    return this.forms[stepIndex % maxSteps];
  }

  handleNext = () => {
    const {stepIndex} = this.state;

    if (stepIndex < 5) {
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

        {getDivider()}
        {this.getStepContent(stepIndex)}
        {getDivider()}

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
            label={stepIndex === 5 ? 'Finalizar' : 'Seguir para o passo seguinte'}
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
