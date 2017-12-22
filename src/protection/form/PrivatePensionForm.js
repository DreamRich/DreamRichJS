import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import TableFormHOC from '../../components/tables/TableFormHOC';
import ActionType from '../../actions/ActionType';
import {routeMap} from '../../routes/RouteMap';
import ProtectionStore from '../../stores/ProtectionStore';
import PatrimonyStore from '../../stores/PatrimonyStore';

const Table = TableFormHOC(
  {
    submit: ActionType.PROTECTION.POSTMULTIFORM,
    add: ActionType.PROTECTION.ADD,
    remove: ActionType.PROTECTION.REMOVE,
    select: ActionType.PROTECTION.SELECT,
  },
  {
    parentId: 'protection_manager_id',
    route: routeMap.private_pensions,
    state: 'private_pensions',
    title: 'Previdência privada',
    subtitleCard: 'Informações da previdência privada',
    headers: [
      {value: 'Nome', name: 'name', type: 'TextField', width: 200},
      {value: 'Depósito anual', name: 'annual_investment', type: 'TextField', width: 200},
      {value: 'Valor atual', name: 'value', type: 'TextField', width: 200},
      {value: 'Taxa de rendimento', name: 'rate', type: 'TextField', width: 200}
    ],
  },
  ProtectionStore,
  () => {
    const registers = ProtectionStore.getState().private_pensions;
    return {registers};
  }
);

export default class PrivatePensionForm extends Component {

  beforeSubmit = (row) => {
    // Private pension is a type of active, so it need the active manager id
    const {manager} = PatrimonyStore.getState();
    row.data['active_manager_id'] = manager.id;
  }

  render = () => {
    return <Table beforeSubmitRow={this.beforeSubmit} {...this.props} />;
  }
}
