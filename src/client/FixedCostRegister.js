import React, {Component} from 'react';
import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FixedCostStore from '../stores/FixedCostStore';
import '../stylesheet/RegisterForms.sass';
import FixedCostForm from './FixedCostForm';

class FixedCostRegister extends Component {

  constructor(props){
    super(props);
    this.state = FixedCostStore.getState();
  }

  addCost = () => {
    AppDispatcher.dispatch({
      actionType: ActionType.FIXEDCOST.ADD
    });
  }

  removeCost = (key) => {
    AppDispatcher.dispatch({
      actionType: ActionType.FIXEDCOST.REMOVE,
      key: key
    });
  }

  componentWillMount = () => {
    this.setState({...this.state,
      listener: FixedCostStore.addListener(this.handleChange)
    });

    AppDispatcher.dispatch({
      actionType: ActionType.FIXEDCOST.TYPE
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
      actionType: ActionType.FIXEDCOST.MANAGER
    });
  }

  render() {
    return (
      <div>
        <h1> Cadastro de custo fixo </h1>

        <Paper className="Paper">


          {this.state.costs.map( key => 
            <div key={key}>
              <FixedCostForm
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

export default FixedCostRegister;
