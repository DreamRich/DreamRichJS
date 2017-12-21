import React, {Component} from 'react';
//import PropTypes from 'prop-types';
// import ActionType from '../actions/ActionType';
import GoalStore from '../stores/GoalStore';
import PlanningForm from '../independence/form/PlanningForm';
import GoalForm from './form/GoalForm';
import IndependenceForm from '../independence/form/IndependenceForm';
import SubStepperGoal from './SubStepperGoal';
import RegisterStore from '../stores/RegisterStore';
import IndependenceStore from '../stores/IndependenceStore';


export default class GoalRegister extends Component {

  componentWillMount = () => {
    this.setState({
      listener: GoalStore.addListener(this.handleUpdate),
      listenerPlanning: RegisterStore.addListener(this.handleUpdate),
      listenerIndependence: IndependenceStore.addListener(this.handleUpdate),
      stepIndex: 0,
    });
    this.handleUpdate();
  }

  handleUpdate = () => {
    const {financialIndependence} = IndependenceStore.getState();
    const {financialPlanning} = RegisterStore.getState();
    const {stepIndex} = GoalStore.getState();
    this.setState({
      stepIndex,
      fi: financialIndependence.id !== undefined,
      fp: (financialPlanning.cdi != 0 && financialPlanning.ipca != 0
        && financialPlanning.target_profitability != 0)
    });
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
    this.state.listenerPlanning.remove();
    this.state.listenerIndependence.remove();
  }

  render = () => {
    const steps = [
      {
        text: 'Taxas do planejamento',
        formComponent: <PlanningForm
          key={1}
          disabled={this.state.fp} />,
      },
      {
        text: 'Objetivo da independência',
        formComponent: <IndependenceForm
          key={2}
          disabled={this.state.fi} />,
      },
      {
        text: 'Objetivos',
        formComponent: <GoalForm key={3} {...this.props} />,
      }
    ];
    return (
      <SubStepperGoal
        stepsNumber={3}
        steps={steps}
        stepIndex={this.state.stepIndex}
      />
    );
  }

}
