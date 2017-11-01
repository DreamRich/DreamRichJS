import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import RegularCostStore from '../stores/RegularCostStore';
import '../stylesheet/RegisterForms.sass';
import RegularCostForm from './form/RegularCostForm';

export default class RegularCostRegister extends Component {

  constructor(props){
    super(props);
    this.state = RegularCostStore.getState();
  }

  addCost = () => {
    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.ADD
    });
  }

  removeCost = (index) => {
    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.REMOVE,
      index: index
    });
  }

  componentWillMount = () => {
    this.setState({...this.state,
      listener: RegularCostStore.addListener(this.handleChange)
    });

    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.TYPE
    });
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    this.setState(RegularCostStore.getState());
  }

  submit = () => {
    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.SUBMIT
    });
  }

  componentDidMount = () => {
    // Create a regular cost when mount component because
    // create it when create regular costs cause Invariant Violation
    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.MANAGER
    });
  }

  render() {
    return (
      <div>
        <h1> Cadastro de custo fixo </h1>

        <Paper className="Paper">


          {this.state.costs.map( cost =>
            <div key={cost.index}>
              <RegularCostForm
                id={this.state.regularCostManager.id}
                types={this.state.types}
                canSubmit={this.state.canSubmit}
                data={cost}
                index={cost.index}
              />
              <RaisedButton
                primary
                label="remove"
                onClick={this.removeCost.bind(this, cost.index)}
              />
            </div>
          )}
          <RaisedButton
            primary
            label="add"
            onClick={this.addCost}
          />

          <RaisedButton
            primary
            type="submit"
            label="Enviar"
            onClick={this.submit}
          />

        </Paper>

      </div>
    );
  }
}
