import React, {Component} from 'react';







import PatrimonyStore from '../../stores/PatrimonyStore';
import {getActiveTypes} from '../../resources/getFormData';
import {postActiveManager} from '../../resources/saveModels';
import ActionType from '../../actions/ActionType';
import {routeMap} from '../../routes/RouteMap';
import TableFormManagerHOC from '../../components/tables/TableFormManagerHOC';


const TableForm = TableFormManagerHOC({
  submit: ActionType.PATRIMONY.POSTMULTIFORM,
  add: ActionType.PATRIMONY.ADD,
  remove: ActionType.PATRIMONY.REMOVE,
  select: ActionType.PATRIMONY.SELECT,
},{
  parentId: 'active_manager_id',
  route: routeMap.actives,
  state: 'actives',
  title: 'Ativos financeiros',
  subtitleCard: 'Adicione as informações do ativo',
  headers: [
    {value: 'Tipo', name: 'active_type_id', options: 'types', type: 'SelectField'},
    {value: 'Nome de referência', name: 'name', type: 'TextField'},
    {value: 'Valor investido', name: 'value', type: 'TextField'},
    {value: 'Taxa (%CDI)', name: 'rate', type: 'TextField'},
  ],
},
PatrimonyStore,
() => {
  const {actives, types} = PatrimonyStore.getState();
  return {registers: actives, options: {types} };
},
postActiveManager
);


export default class ActiveForm extends Component {

  componentWillMount = () => getActiveTypes()

  render = () => {
    return ( <TableForm {...this.props} /> );
  }

}
