import React, {Component} from 'react';
import RegisterStore from '../stores/RegisterStore';
import PatrimonyChart from './PatrimonyChart';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import PatrimonyStore from '../stores/PatrimonyStore';
import _ from 'lodash';
import PatrimonyDifference from './PatrimonyDifference';
import Divider from 'material-ui/Divider';

export default class ActiveProfit extends Component {

  componentWillMount = () => {
    const {financialPlanning} = RegisterStore.getState();
    this.setState({
      patrimony: financialPlanning.patrimony_id,
      financial_planning_id: financialPlanning.pk,
      listener: RegisterStore.addListener(this.handleUpdate),
      listenerPatrimony: PatrimonyStore.addListener(this.handleUpdatePatrimony)
    });
  }

  componentWillUnmount = () => this.state.listener.remove()

  handleUpdatePatrimony = () => {
    const {flow} = PatrimonyStore.getState();
    if (flow.actual_flow_patrimony && flow.suggested_flow_patrimony) {
      this.setState({
        targetRate: flow.suggested_flow_patrimony.rate,
        actualRate: flow.actual_flow_patrimony.rate,
        endPatrimony: _.last(flow.suggested_flow_patrimony.flow),
        actualPatrimony: _.last(flow.actual_flow_patrimony.flow),
      });
    }
  }
  handleUpdate = () => {
    const {financialPlanning} = RegisterStore.getState();
    this.setState({
      patrimony_id: financialPlanning.patrimony_id,
      financial_planning_id: financialPlanning.pk,
    });
  }

  render = () => {
    const {targetRate, actualRate, endPatrimony, actualPatrimony} = this.state;
    const data = {targetRate, actualRate, endPatrimony, actualPatrimony};
    return (
      <Card className='Card'>
        <CardTitle
          title='Gráfico'
          subtitle={'Veja a diferença entre ter uma boa ' +
            'carteira de investimentos'}
        />
        <CardText>
          <PatrimonyChart id={this.state.financial_planning_id} />
        </CardText>
        <Divider />
        <CardTitle
          title='Diferença no patrimônio'
          subtitle={'Veja a diferença entre os patrimônios '}
          showExpandableButton
          actAsExpander
        />
        <CardText expandable>
          <PatrimonyDifference data={data} />
        </CardText>
      </Card>
    );
  }
}
