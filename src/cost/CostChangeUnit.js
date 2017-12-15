import TableFormHOC from '../components/tables/TableFormHOC';
import ActionType from '../actions/ActionType';
import RegularCostStore from '../stores/RegularCostStore';
import {routeMap} from '../routes/RouteMap';

export default TableFormHOC({
  submit: ActionType.REGULARCOST.SUBMIT,
  add: ActionType.REGULARCOST.ADD,
  remove: ActionType.REGULARCOST.REMOVE,
  select: ActionType.REGULARCOST.SELECT,
},
{
  parentId: 'cost_manager_id',
  route: routeMap.cost_unit_change,
  state: 'costChanges',
  title: 'Mudança no custo',
  subtitleCard: 'Mudança no custo',
  headers: [
    {value: 'Valor anual', name: 'annual_value', type: 'TextField', width: 50},
    {value: 'Ano da mudança', name: 'year', type: 'TextField', width: 50},
  ],
},
RegularCostStore,
() => {
  const registers = RegularCostStore.getState().costChanges;
  return {registers};
}
);

