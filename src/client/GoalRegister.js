import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import GoalStore from '../stores/GoalStore';
import '../stylesheet/RegisterForms.sass';
import GoalForm from './form/GoalForm';

class GoalRegister extends Component {

  constructor(props){
    super(props);
    this.state = GoalStore.getState();
  }

  addGoal = () => {
    AppDispatcher.dispatch({
      action: ActionType.GOAL.ADD
    });
  }

  removeGoal = (key) => {
    AppDispatcher.dispatch({
      action: ActionType.GOAL.REMOVE,
      key: key
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

  handleChange = () => {
    this.setState(GoalStore.getState());
  }

  submitBase = (event) => {
    event.preventDefault();
    AppDispatcher.dispatch({
      action: ActionType.GOAL.MANAGER
    });
  }

  render() {
    return (
      <div>
        <h1> Cadastro de objetivos </h1>

        <Paper className="Paper">


          {this.state.goals.map( key => 
            <div key={key}>

              <GoalForm
                id={this.state.id}
                types={this.state.types}
                hasEndDate={this.state.hasEndDate}
              />

              <RaisedButton
                primary
                label="remove"
                onClick={this.removeGoal.bind(this, key)}
              />
            </div>
          )}
          <RaisedButton
            primary
            label="add"
            onClick={this.addGoal}
          />

          <form 
            onSubmit={this.submitBase}
          >
            <RaisedButton
              primary
              type="submit"
              label="Enviar"
            />
          </form>

        </Paper>

      </div>
    );
  }
}

export default GoalRegister;
