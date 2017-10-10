import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import ClientStore from '../stores/ClientStore';
import '../stylesheet/RegisterForms.sass';
import FixedCostForm from './FixedCostForm';

class FixedCostRegister extends Component {

  constructor(props){
    super(props);
  }

  state = {
    costs: [0],
    idx: 1
  }

  addCost = () => {
    const new_array = this.state.costs.slice();
    new_array.push(this.state.idx);
    this.setState({costs: new_array, idx: this.state.idx + 1});
  }

  removeCost = (key) => {
    const new_array = this.state.slice();
    this.setState({
      costs: new_array.filter( element => element !== key )
    });
  }

  componentWillMount = () => {
    this.setState({
      listener: ClientStore.addListener(this.handleChange)
    });
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    this.setState(ClientStore.getState());
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
