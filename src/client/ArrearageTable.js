import GridTable from '../components/GridTable';
import React from 'react';
import {Link} from 'react-router-dom';
import {Toolbar} from 'react-data-grid-addons';
import FlatButton from 'material-ui/FlatButton';


export default class ArrearageTable extends GridTable {
  constructor(props) {
    super(props);
  }

  getRoute = () => '/api/patrimony/arrearage/9/list_calculator/'

  // Using arrow function the table doens't work
  getColumns() {
    return [
      { key: 'period', name: 'Período', sortable: true, filterable: true, resizable: true },
      { key: 'provision', name: 'Prestação', sortable: true, filterable: true, resizable: true },
      { key: 'interest', name: 'Juros', sortable: true, filterable: true, resizable: true },
      { key: 'amortization', name: 'Amortização', sortable: true, filterable: true, resizable: true },
      { key: 'outstanding_balance', name: 'Saldo devedor', locked: true, filterable: false, resizable: false }
    ];
  }

  // This form is necessary to avoid react/missing-displayName warning
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

  // This form is necessary to avoid react/missing-displayName warning
  getToolbar(){
    return (
      <Toolbar enableFilter={true} />
    );
  }
}
