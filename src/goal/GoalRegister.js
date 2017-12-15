import React, {Component} from 'react';
// import ActionType from '../actions/ActionType';
// import GoalStore from '../stores/GoalStore';
import GoalForm from './form/GoalForm';
import IndependenceForm from '../independence/form/IndependenceForm';

export default class GoalRegister extends Component {

  render = () => {
    return (
      <div>
        <IndependenceForm />
        <GoalForm {...this.props} />
      </div>
    );
  }

}
