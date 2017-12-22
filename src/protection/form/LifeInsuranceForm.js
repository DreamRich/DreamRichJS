import TableFormHOC from '../../components/tables/TableFormHOC';
import ActionType from '../../actions/ActionType';
import {routeMap} from '../../routes/RouteMap';
import ProtectionStore from '../../stores/ProtectionStore';

export default TableFormHOC(
  {
    submit: ActionType.PROTECTION.POSTMULTIFORM,
    add: ActionType.PROTECTION.ADD,
    remove: ActionType.PROTECTION.REMOVE,
    select: ActionType.PROTECTION.SELECT,
  },{
    parentId: 'protection_manager_id',
    route: routeMap.life_insurances,
    state: 'life_insurances',
    title: 'Seguro de vida',
    subtitleCard: 'Adicione um seguro de vida',
    headers: [
      {value: 'Atual', name: 'actual', type: 'ToggleField', width: 200},
      {value: 'Nome', name: 'name', type: 'TextField', width: 200},
      {value: 'Valor a receber', name: 'value_to_recive', type: 'TextField', width: 200},
      {value: 'Valor pago anualmente', name: 'value_to_pay_annual', type: 'TextField', width: 200},
      {value: 'Recuperável', name: 'redeemable', type: 'ToggleField', width: 200},
      {value: 'Tem ano de pagamento', name: 'has_year_end', type: 'ToggleField', width: 200},
      {value: 'Ano do último pagamento', name: 'year_end', type: 'TextField', width: 200},
    ],
  },
  ProtectionStore,
  () => {
    const registers = ProtectionStore.getState().life_insurances;
    return {registers};
  }
);
