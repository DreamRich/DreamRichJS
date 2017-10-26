/** This file implements a Grid table defined in src/component
 * Only override the necessary methods to it work.
 */
import GridTable from '../components/GridTable';
import React from 'react';
import {Link} from 'react-router-dom';
import {Toolbar} from 'react-data-grid-addons';
import FlatButton from 'material-ui/FlatButton';

export default class ClientTable extends GridTable {
  constructor(props) {
    super(props);
  }

  getColumns(){
    return [
      { key: 'name', name: 'Name', sortable: true, filterable: true, resizable: true },
      { key: 'telephone', name: 'Telefone', sortable: true, filterable: true, resizable: true },
      { key: 'email', name: 'Email', sortable: true, filterable: true, resizable: true },
      { key: 'cpf', name: 'CPF', sortable: true, filterable: true, resizable: true },
      { key: 'actions', name: 'Actions', locked: true, filterable: false, resizable: false }
    ];
  }

  getRoute(){ return '/api/client/active/'; }

  getActions(register) {
    if(register !== undefined && register !== null){
      return (
        <FlatButton
          primary
          label=">"
          containerElement={ <Link to={`/client/${register.id}`} /> }
        />
      );
    }
    return null;
  }

  getToolbar(){
    return (
      <Toolbar enableFilter={true} />
    );
  }
}
