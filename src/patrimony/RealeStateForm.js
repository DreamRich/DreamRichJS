// import React, {Component} from 'react';
// import PropTypes from 'prop-types';
// import FormsyToggleYesNo from '../components/FormsyToggleYesNo';
// import ExtraSubForm from './ExtraSubForm';
// import { Row, Col } from 'react-flexbox-grid';

// import ActionType from '../actions/ActionType';
// import AppDispatcher from '../AppDispatcher';
// import ActiveStore from '../stores/ActiveStore';
// import Paper from 'material-ui/Paper';
// import PropTypes from 'prop-types';
// import RaisedButton from 'material-ui/RaisedButton';
// import MultiForm from './MultiForm';
import PatrimonyStore from '../stores/PatrimonyStore';
import ActionType from '../actions/ActionType';
import {routeMap} from '../routes/RouteMap';
import TableFormHOC from '../components/tables/TableFormHOC';


export default TableFormHOC({
  submit: ActionType.PATRIMONY.POSTMULTIFORM,
  add: ActionType.PATRIMONY.ADD,
  remove: ActionType.PATRIMONY.REMOVE,
  select: ActionType.PATRIMONY.SELECT,
},{
  parentId: 'patrimony_id',
  route: routeMap.realestates,
  state: 'realestates',
  title: 'Bens imóveis',
  subtitleCard: 'Adicione as informações dos bens imóveis',
  headers: [
    {value: 'Nome', name: 'name', type: 'TextField'},
    {value: 'Valor', name: 'value', type: 'TextField'},
    {value: 'Vendável', name: 'salable', type: 'ToggleField'},
  ],
},
PatrimonyStore,
() => {
  const {realestates} = PatrimonyStore.getState();
  return {registers: realestates};
});
