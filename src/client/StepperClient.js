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
import {withRouter} from 'react-router';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';

class StepperClient extends React.Component {

  forms = [
    {
      name: 'Cadastro Básico',
      register: <ClientRegister key={1} />,
    },
    {
      name: 'Custos Fixos',
      register: <RegularCostRegister key={2} />,
    },
    {
      name: 'Renda',
      register: <PatrimonyRegister key={3} />,
    },
    {
      name: 'Patrimônio',
      register: <PatrimonyRegister key={4} main={false}/>,
    },
    {
      name: 'Proteção',
      register: <div key={5} >Proteção </div>,
    },
    {
      name: 'Objetivos',
      register: <GoalRegister key={6} />
    }
  ]

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
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

  componentWillMount = () => this.setState({
    ...RegisterStore.getState(),
    stepIndex: 0,
    listener: RegisterStore.addListener(this.handleUpdate)
  })

  componentWillUnmount = () => this.state.listener.remove()

  handleUpdate = () => this.setState(RegisterStore.getState())

  getStepContent = (stepIndex) => {
    const maxSteps = this.forms.length;
    return this.forms[stepIndex % maxSteps].register;
  }

  handleNext = () => {
    const {stepIndex, financialPlanning} = this.state;

    if(stepIndex === this.forms.length -1) {
      this.props.history.push(`/dashboard/${financialPlanning.pk}/`);
    }

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
          <Stepper
            activeStep={stepIndex}
            connector={<ArrowForwardIcon />}
            linear={false}
          >
            {this.forms.map( (item, index) => <Step
              key={index}
              onClick={() => this.setState({stepIndex: index})}
            >
              <StepButton>{item.name}</StepButton>
            </Step>
            )}
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

export default withRouter(StepperClient);
