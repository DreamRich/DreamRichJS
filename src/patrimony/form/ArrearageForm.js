

import ActionType from '../../actions/ActionType.js';









import PatrimonyStore from '../../stores/PatrimonyStore';
import {routeMap} from '../../routes/RouteMap';
import TableFormHOC from '../../components/tables/TableFormHOC';

export default TableFormHOC({
  submit: ActionType.PATRIMONY.POSTMULTIFORM,
  add: ActionType.PATRIMONY.ADD,
  remove: ActionType.PATRIMONY.REMOVE,
  select: ActionType.PATRIMONY.SELECT,
},{
  parentId: 'patrimony_id',
  route: routeMap.arrearages,
  state: 'arrearages',
  title: 'Dívidas e financiamentos',
  subtitleCard: 'Adicione as informações de suas dívidas e financiamentos',
  headers: [
    {value: 'Nome', name: 'name', type: 'TextField'},
    {value: 'Valor total', name: 'value', type: 'TextField'},
    {value: 'Prazo total', name: 'period', type: 'TextField'},
    {value: 'Taxa de juros', name: 'rate', type: 'TextField'},
    {value: 'Parcela atual', name: 'actual_period', type: 'TextField'},
    {value: 'Sistema de parcelamento', name: 'amortization_system', type: 'SelectField', options: 'amortization_system'},
  ],
},
PatrimonyStore,
() => {
  const {arrearages} = PatrimonyStore.getState();
  return {
    registers: arrearages,
    options: {
      amortization_system: [
        {id: 'SAC'}, {id: 'PRICE'}, {id: 'Comum'}
      ],
    },
  };
}
);
