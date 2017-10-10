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
    this.setState({...FixedCostStore.getState(), 
      listener: FixedCostStore.addListener(this.handleChange)
    });
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    this.setState(FixedCostStore.getState());
  }

  render() {
    return (
      <div>
        <h1> Cadastro de custo fixo </h1>

        <Paper className="Paper">

          {this.state.costs.map( key => 
            <div key={key}>
              <FixedCostForm />
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
          <RaisedButton
            primary
            type="submit"
            label="Enviar"
            onClick={() => this.baseForm.submit()}
          />

        </Paper>

      </div>
    );
  }
}

export default FixedCostRegister;
