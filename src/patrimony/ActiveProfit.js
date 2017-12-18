import React, {Component} from 'react';
import RegisterStore from '../stores/RegisterStore';
import PatrimonyChart from './PatrimonyChart';

export default class ActiveProfit extends Component {

  componentWillMount = () => {
    const {financialPlanning} = RegisterStore.getState();
    this.setState({
      patrimony: financialPlanning.patrimony_id,
      financial_planning_id: financialPlanning.pk,
      listener: RegisterStore.addListener(this.handleUpdate)
    });
  }

  componentWillUnmount = () => this.state.listener.remove()

  handleUpdate = () => {
    const {financialPlanning} = RegisterStore.getState();
    this.setState({
      patrimony_id: financialPlanning.patrimony_id,
      financial_planning_id: financialPlanning.pk,
    });
  }

  render = () => {
    return (
      <div>
        <h1> Carteira </h1>
        <PatrimonyChart id={this.state.financial_planning_id} />
      </div>
    );
  }
}
