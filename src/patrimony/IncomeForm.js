import ActionType from '../actions/ActionType.js';
import PatrimonyStore from '../stores/PatrimonyStore';
import {routeMap} from '../routes/RouteMap';
import TableFormHOC from '../components/tables/TableFormHOC';


export default TableFormHOC({
  submit: ActionType.PATRIMONY.POSTMULTIFORM,
  add: ActionType.PATRIMONY.ADD,
  remove: ActionType.PATRIMONY.REMOVE,
  select: ActionType.PATRIMONY.SELECT,
},{
  parentId: 'patrimony_id',
  route: routeMap.incomes,
  state: 'incomes',
  title: 'Renda',
  subtitleCard: 'Adicione as informações da sua renda',
  headers: [
    {value: 'Nome', name: 'source', type: 'TextField'},
    {value: 'Valor', name: 'value_monthly', type: 'TextField'},
    {value: 'Décimo terceiro', name: 'thirteenth', type: 'ToggleField'},
    {value: 'Décimo quarto', name: 'fourteenth', type: 'ToggleField'},
    {value: 'Férias', name: 'vacation', type: 'ToggleField'},
  ],
},
PatrimonyStore,
() => {
  const {incomes} = PatrimonyStore.getState();
  return {registers: incomes};
}
);
