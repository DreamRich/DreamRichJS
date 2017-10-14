import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FixedCostStore from '../stores/FixedCostStore';
import '../stylesheet/RegisterForms.sass';
import GoalForm from './GoalForm';

class GoalRegister extends Component {

  constructor(props){
    super(props);
    this.state = FixedCostStore.getState();
  }

  addGoal = () => {
    AppDispatcher.dispatch({
      actionType: ActionType.GOAL.ADD
    });
  }

  removeGoal = (key) => {
    AppDispatcher.dispatch({
      actionType: ActionType.GOAL.REMOVE,
      key: key
    });
  }

  componentWillMount = () => {
    this.setState({...this.state,
      listener: FixedCostStore.addListener(this.handleChange)
    });

    AppDispatcher.dispatch({
      actionType: ActionType.GOAL.TYPE
    });
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    this.setState(FixedCostStore.getState());
  }

  submitBase = (event) => {
    event.preventDefault();
    AppDispatcher.dispatch({
      actionType: ActionType.GOAL.MANAGER
    });
  }

  render() {
    return (
      <div>
        <h1> Cadastro de custo fixo </h1>

        <Paper className="Paper">


          {this.state.goals.map( key => 
            <div key={key}>

              <GoalForm
                id={this.state.id}
                types={this.state.types}
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
