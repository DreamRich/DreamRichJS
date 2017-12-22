import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ActionType from '../../actions/ActionType.js';
import PatrimonyStore from '../../stores/PatrimonyStore';
import {routeMap} from '../../routes/RouteMap';
import TableFormHOC from '../../components/tables/TableFormHOC';
import {getIncomeChanges} from '../../resources/getModels.js';

const TableForm = TableFormHOC({
  submit: ActionType.PATRIMONY.POSTMULTIFORM,
  add: ActionType.PATRIMONY.ADD,
  remove: ActionType.PATRIMONY.REMOVE,
  select: ActionType.PATRIMONY.SELECT,
},
{
  parentId: 'incomes_id',
  route: routeMap.unit_change,
  state: 'unit_change',
  title: 'Mudança na renda',
  subtitleCard: 'Mudança na renda',
  headers: [
    {value: 'Valor anual', name: 'annual_value', type: 'TextField', width: 100},
    {value: 'Ano da mudança', name: 'year', type: 'TextField', width: 100},
  ],
},
PatrimonyStore,
() => {
  const registers = PatrimonyStore.getState().unit_change;
  return {registers};
}
);

export default class IncomeChangeUnit extends Component {

  static propTypes = {
    id: PropTypes.number,
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.id !== this.props.id){
      getIncomeChanges(nextProps.id);
    }
  }

  componentWillMount = () => {
    if(this.props.id) {
      getIncomeChanges(this.props.id);
    }
  }


  render = () => {
    return (<TableForm {...this.props} expandable/>);
  }
}
