import React, {Component} from 'react';
//import PropTypes from 'prop-types';
// import ActionType from '../actions/ActionType';
// import GoalStore from '../stores/GoalStore';
import PlanningForm from '../independence/form/PlanningForm';
import GoalForm from './form/GoalForm';
import IndependenceForm from '../independence/form/IndependenceForm';

export default class GoalRegister extends Component {

  render = () => {
    return (
      <div>
        <IndependenceForm disabled={false} />
        <PlanningForm disabled={false} />
        <GoalForm {...this.props} />
      </div>
    );
  }

}
