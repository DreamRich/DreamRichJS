import PatrimonyStore from '../../stores/PatrimonyStore';
import ActionType from '../../actions/ActionType';
import {routeMap} from '../../routes/RouteMap';
import TableFormHOC from '../../components/tables/TableFormHOC';


export default TableFormHOC({
  submit: ActionType.PATRIMONY.POSTMULTIFORM,
  add: ActionType.PATRIMONY.ADD,
  remove: ActionType.PATRIMONY.REMOVE,
  select: ActionType.PATRIMONY.SELECT,
},{
  parentId: 'patrimony_id',
  route: routeMap.equipments,
  state: 'equipments',
  title: 'Equipamentos',
  subtitleCard: 'Adicione as informações dos equipamentos',
  headers: [
    {value: 'Nome', name: 'name', type: 'TextField'},
    {value: 'Valor', name: 'value', type: 'TextField'},
  ],
},
PatrimonyStore,
() => {
  const {equipments} = PatrimonyStore.getState();
  return {registers: equipments};
});
