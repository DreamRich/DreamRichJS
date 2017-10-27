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

  removeCost = (key) => {
    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.REMOVE,
      key: key
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

  submitBase = (event) => {
    event.preventDefault();
    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.MANAGER
    });
  }

  render() {
    return (
      <div>
        <h1> Cadastro de custo fixo </h1>

        <Paper className="Paper">


          {this.state.costs.map( key => 
            <div key={key}>
              <RegularCostForm
                id={this.state.id}
                types={this.state.types}
              />
              <RaisedButton
                primary
                label="remove"
                onClick={this.removeCost.bind(this, key)}
              />
            </div>
          )}
          <RaisedButton
            primary
            label="add"
            onClick={this.addCost}
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
