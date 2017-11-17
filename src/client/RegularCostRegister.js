import React, {Component} from 'react';
// import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
import RegularCostStore from '../stores/RegularCostStore';
import '../stylesheet/RegisterForms.sass';
import {postRegularCostManager} from '../resources/saveModels';
import {routeMap} from '../routes/RouteMap';
import TableFormManagerHOC from '../components/tables/TableFormManagerHOC';
import {getRegularCostTypes} from '../resources/getFormData';


// AppDispatcher.dispatch({
//   action: ActionType.REGULARCOST.TYPE
// });

// AppDispatcher.dispatch({
//   action: ActionType.REGULARCOST.MANAGER
// });
const TableForm = TableFormManagerHOC({
  submit: ActionType.REGULARCOST.SUBMIT,
  add: ActionType.REGULARCOST.ADD,
  remove: ActionType.REGULARCOST.REMOVE,
  select: ActionType.REGULARCOST.SELECTDEPENDENT,
},{
  parentId: 'cost_manager_id',
  route: routeMap.regular_cost,
  state: 'costs',
  title: 'Custos fixos',
  subtitleCard: 'Adicione as informações do custo fixo',
  headers: [
    {value: 'Tipo', name: 'cost_type_id', options: 'types', type: 'SelectField'},
    {value: 'Valor', name: 'value', type: 'TextField'},
  ],
},
RegularCostStore,
() => {
  const {costs, types} = RegularCostStore.getState();
  return {registers: costs, options: {types} };
},
postRegularCostManager
);
export default class RegularCostRegister extends Component {


  componentWillMount = () => getRegularCostTypes()

  render = () => {
    // title={this.props.title}
    // subtitle={this.props.subtitle}
    // parent_name='cost_manager_id'
    //     );
    return ( <TableForm {...this.props} /> );
  }

}
