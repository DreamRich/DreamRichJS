/** This file implements a Grid table defined in src/layout
 * Only override the necessary methods to it work.
 */
import FontIcon from 'material-ui/FontIcon';
import GridTable from '../layout/GridTable';
import React from 'react';
import {Link} from 'react-router-dom';
import {Toolbar} from 'react-data-grid-addons';

export default class ClientTable extends GridTable {
  constructor(props) {
    super(props);
  }

  getColumns(){
    return [
      { key: 'name', name: 'Name', sortable: true, filterable: true, resizable: true },
      { key: 'telephone', name: 'Telefone', sortable: true, filterable: true, resizable: true },
      { key: 'email', name: 'Email', sortable: true, filterable: true, resizable: true },
      { key: 'cpf', name: 'cpf', sortable: true, filterable: true, resizable: true },
      { key: 'actions', name: 'Actions', locked: true, filterable: false, resizable: false }
    ];
  }

  getRoute(){ return '/api/client/active/'; }

  getActions(register) {
    if(register !== undefined && register !== null){
      return (<Link to={`/client/${register.id}`}>
        <FontIcon className="material-icons"> ver </FontIcon>
        </Link>);
    }
    return null;
  }

  getToolbar(){
    return (<Toolbar enableFilter={true} />);
  }

}
