import React, {Component} from 'react';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import '../stylesheet/RegisterForms.sass';
import RegularCostStore from '../stores/RegularCostStore';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class RegularCostDashboard extends Component {

  state = RegularCostStore.getState();

  componentWillMount = () => {
    this.setState({
      listener: RegularCostStore.addListener(this.handleChange)
    });

    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.TYPE
    });
  }

  componentWillUnmount = () => this.state.listener.remove()

  handleChange = () => this.setState(RegularCostStore.getState())

  componentDidMount = () => {
    AppDispatcher.dispatch({
      action: ActionType.REGULARCOST.MANAGER
    });
  }

  getOptions = (costID) => {
    return this.state.types.map( (type) => {
      if(costID===type.id){
        return type.name;
      }
    });
  }
  getContentCard = (cost) => {
    const costType = cost.cost_type || {};
    return (
      <TableRow key={cost.index}>
        <TableRowColumn>{this.getOptions(costType.id)}</TableRowColumn>
        <TableRowColumn>{cost.value}</TableRowColumn>
      </TableRow>
    );
  }

  render() {

    return (
      <div>
        <Card className='Card'>
          <CardTitle
            title='Custo fixo'
            subtitle='Tabela com os dados do custo fixo'
          />
          <CardText>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn><h2>Tipo de custo fixo</h2></TableHeaderColumn>
                  <TableHeaderColumn><h2>Valor do custo</h2></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                {this.state.costs.map( cost =>
                  this.getContentCard(cost)
                )}
              </TableBody>
            </Table>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default RegularCostDashboard;
