import ActionType from '../../actions/ActionType.js';
import PatrimonyStore from '../../stores/PatrimonyStore';
import {routeMap} from '../../routes/RouteMap';
import TableFormHOC from '../../components/tables/TableFormHOC';

export default TableFormHOC({
  submit: ActionType.PATRIMONY.SUBMIT,
  add: ActionType.PATRIMONY.ADD,
  remove: ActionType.PATRIMONY.REMOVE,
  select: ActionType.PATRIMONY.SELECT,
},
{
  parentId: 'incomes_id',
  route: routeMap.income_change,
  state: 'incomesChange',
  title: 'Mudança na renda',
  subtitleCard: 'Mudança na renda',
  headers: [
    {value: 'Valor anual', name: 'annual_value', type: 'TextField', width: 50},
    {value: 'Ano da mudança', name: 'year', type: 'TextField', width: 50},
  ],
},
PatrimonyStore,
() => {
  const registers = PatrimonyStore.getState().incomesChange;
  return {registers};
}
);



