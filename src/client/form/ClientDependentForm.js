import ActionType from '../../actions/ActionType';
import ClientStore from '../../stores/ClientStore';
import {routeMap} from '../../routes/RouteMap';

import TableFormHOC from '../../components/tables/TableFormHOC';


export default TableFormHOC(
  {
    submit: ActionType.CLIENT.POSTMULTIFORM,
    add: ActionType.CLIENT.ADDDEPENDENT,
    remove: ActionType.CLIENT.REMOVEDEPENDENT,
    select: ActionType.CLIENT.SELECTDEPENDENT,
  },
  {
    parentId: 'active_client_id',
    route: routeMap.dependent,
    state: 'dependents',
    title: 'Dependente',
    subtitleCard: 'Insira as informações correspondentes as ' +
     'informações do dependente.',
    headers: [
      {value: 'Nome', name: 'name', type: 'TextField', width: 200},
      {value: 'Sobrenome', name: 'surname', type: 'TextField', width: 200},
      {value: 'Data do aniversário', name: 'birthday', type: 'DatePicker', width: 200},
    ],
  },
  ClientStore,
  () => {
    const {dependents} = ClientStore.getState();
    return dependents;
  });
