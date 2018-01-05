import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TableFormHOC from '../components/tables/TableFormHOC';
import ActionType from '../actions/ActionType';
import RegularCostStore from '../stores/RegularCostStore';
import {routeMap} from '../routes/RouteMap';
import {getCostChanges} from '../resources/getModels';

const TableForm = TableFormHOC({
  submit: ActionType.REGULARCOST.SUBMIT,
  add: ActionType.REGULARCOST.ADD,
  remove: ActionType.REGULARCOST.REMOVE,
  select: ActionType.REGULARCOST.SELECT,
},
{
  parentId: 'cost_manager_id',
  route: routeMap.unit_change,
  state: 'unit_change',
  title: 'Mudança no custo',
  subtitleCard: 'Mudança no custo',
  headers: [
    {value: 'Valor anual', name: 'annual_value', type: 'TextField', width: 100},
    {value: 'Ano da mudança', name: 'year', type: 'TextField', width: 100},
  ],
},
RegularCostStore,
() => {
  const registers = RegularCostStore.getState().unit_change;
  return {registers};
}
);
export default class CostChangeUnit extends Component {

  static propTypes = {
    id: PropTypes.number,
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.id !== this.props.id){
      getCostChanges(nextProps.id);
    }
  }

  componentWillMount = () => {
    if(this.props.id) {
      getCostChanges(this.props.id);
    }
  }

  render = () => {
    return (<TableForm {...this.props} expandable={true} />);
  }
}
