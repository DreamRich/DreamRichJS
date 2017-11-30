import React, {Component} from 'react';
// import AppDispatcher from '../AppDispatcher';
import ActionType from '../actions/ActionType';
// import RaisedButton from 'material-ui/RaisedButton';
import GoalStore from '../stores/GoalStore';
import '../stylesheet/RegisterForms.sass';
// import GoalForm from './form/GoalForm';
// import getSelectOption from '../utils/getSelectOption';


// import ActionType from '../actions/ActionType';
import {postGoalManager} from '../resources/saveModels';
import {routeMap} from '../routes/RouteMap';
import TableFormManagerHOC from '../components/tables/TableFormManagerHOC';
import {getGoalTypes} from '../resources/getFormData';


const TableForm = TableFormManagerHOC({
  submit: ActionType.GOAL.SUBFORM,
  add: ActionType.GOAL.ADD,
  remove: ActionType.GOAL.REMOVE,
  select: ActionType.GOAL.SELECT,
},{
  parentId: 'goal_manager_id',
  route: routeMap.goal,
  state: 'goals',
  title: 'Objetivos',
  subtitleCard: 'Adicione as informações dos objetivos',
  headers: [
    {value: 'Tipo', name: 'goal_type_id', options: 'types', type: 'SelectField'},
    {value: 'Ano de início', name: 'init_year', type: 'TextField'},
    {value: 'Ano de término', name: 'end_year', type: 'TextField'},
    {value: 'Periodicidade', name: 'periodicity', type: 'TextField'},
    {value: 'Valor', name: 'value', type: 'TextField'},
    {value: 'Tem término?', name: 'has_end_date', type: 'ToggleField'},
  ],
},
GoalStore,
() => {
  const {goals, types} = GoalStore.getState();
  return {registers: goals, options: {types} };
},
postGoalManager
);

export default class GoalRegister extends Component {


  componentWillMount = () => getGoalTypes()

  render = () => {
    return ( <TableForm {...this.props} /> );
  }

}
