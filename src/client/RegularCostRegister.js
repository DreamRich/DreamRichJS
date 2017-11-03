import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
// import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import RegularCostStore from '../stores/RegularCostStore';
import '../stylesheet/RegisterForms.sass';
import RegularCostForm from './form/RegularCostForm';
import getSelectOption from '../utils/getSelectOption';

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
    const labelRemove = 'Tenho este custo fixo?';
    const labelAdd = (this.state.costs.length === 0 ?
      'Possui custo fixo? (Marque o quadrado ao lado caso haja).' :
      'Possui mais custos fixos? (Marque o quadrado ao lado caso haja).');
    return (
      <div>
        {this.state.costs.map( cost =>
          <div key={cost.index}>
            {getSelectOption(
              this.removeCost.bind(this, cost.index), true, labelRemove)
            }
            <RegularCostForm
              id={this.state.regularCostManager.id}
              types={this.state.types}
              canSubmit={this.state.canSubmit}
              data={cost}
              index={cost.index}
            />
          </div>
        )}
        {getSelectOption(this.addCost, false, labelAdd)}

        <RaisedButton
          primary
          label="Salvar"
          style={{float: 'right'}}
          onClick={this.submit}
        />

      </div>
    );
  }
}
