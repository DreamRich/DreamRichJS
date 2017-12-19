import React, {Component} from 'react';
import RegisterStore from '../stores/RegisterStore';
import PatrimonyChart from './PatrimonyChart';
import {Card, CardTitle, CardText} from 'material-ui/Card';

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
      <Card className='Card'>
        <CardTitle
          title='Diferença no patrimônio'
          subtitle={'Veja a diferença entre ter uma boa ' +
            'carteira de investimentos'}
        />
        <CardText>
          <PatrimonyChart id={this.state.financial_planning_id} />
        </CardText>
      </Card>
    );
  }
}
