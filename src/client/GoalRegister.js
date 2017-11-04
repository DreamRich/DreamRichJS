import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import RaisedButton from 'material-ui/RaisedButton';
import GoalStore from '../stores/GoalStore';
import '../stylesheet/RegisterForms.sass';
import GoalForm from './form/GoalForm';
import getSelectOption from '../utils/getSelectOption';

export default class GoalRegister extends Component {

  state = GoalStore.getState()

  addGoal = () => {
    AppDispatcher.dispatch({
      action: ActionType.GOAL.ADD
    });
  }

  removeGoal = (index) => {
    AppDispatcher.dispatch({
      action: ActionType.GOAL.REMOVE,
      index: index
    });
  }

  componentWillMount = () => {
    this.setState({
      listener: GoalStore.addListener(this.handleChange)
    });

    AppDispatcher.dispatch({
      action: ActionType.GOAL.TYPE
    });
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  componentDidMount = () => {
    // Create a regular cost when mount component because
    // create it when create regular costs cause Invariant Violation
    AppDispatcher.dispatch({
      action: ActionType.GOAL.MANAGER
    });
  }


  handleChange = () => {
    this.setState(GoalStore.getState());
  }

  submit = () => {
    AppDispatcher.dispatch({
      action: ActionType.GOAL.SUBMIT
    });
  }

  render() {
    const labelRemove = 'Tenho este objetivo?';
    const labelAdd = (this.state.goals.length === 0 ?
      'Possui um objetivo? (Marque o quadrado ao lado caso haja).' :
      'Possui mais objetivos? (Marque o quadrado ao lado caso haja).');
    return (
      <div>
        {this.state.goals.map( goal =>
          <div key={goal.index}>
            {getSelectOption(
              this.removeGoal.bind(this, goal.index), true, labelRemove)
            }
            <GoalForm
              id={this.state.goalManager.id}
              types={this.state.types}
              data={goal}
              index={goal.index}
              canSubmit={this.state.canSubmit}
            />
          </div>
        )}
        {getSelectOption(this.addGoal, false, labelAdd)}
        <RaisedButton
          primary
          label="Salvar"
          onClick={this.submit}
        />
      </div>
    );
  }

}
