import ReactDataGrid from 'react-data-grid';
import {Link} from 'react-router-dom';
import React, {Component} from 'react';
import getData from '../resources/getData';
import {Data, Toolbar} from 'react-data-grid-addons';
import FontIcon from 'material-ui/FontIcon';
import {Auth} from '../auth/Auth';
import '../stylesheet/Table.sass';

export default class ClientTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _columns: [
        { key: 'name', name: 'Name', sortable: true, filterable: true, resizable: true, editable: true },
        { key: 'surname', name: 'Surname', sortable: true, filterable: true, resizable: true, editable: true },
        { key: 'telephone', name: 'Telefone', sortable: true, filterable: true, resizable: true, editable: true },
        { key: 'email', name: 'Email', sortable: true, filterable: true, resizable: true, editable: true },
        { key: 'cpf', name: 'cpf', sortable: true, filterable: true, resizable: true, editable: true },
        { key: 'actions', name: 'Actions', locked: true, filterable: false, resizable: false, editable: false }
      ],
      rows: [], filters: {}, sortDirection: null,
      sortColumn: null};
    this.getRows = this.getRows.bind(this);
    this.handleAddRow = this.handleAddRow.bind(this);
    this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
  }

  componentWillMount(){ getData('/api/client/active/', this, 'rows');}

  getRows() {
    return Data.Selectors.getRows(this.state);
  }

  getSize(){
    return this.getRows().length;
  }

  rowGetter(i) {
    const row = this.getRows()[i];
    if(row !== undefined && row !== null){
      row['actions'] = (<Link to="/login">
        <FontIcon className="material-icons">home</FontIcon>
        </Link>);
    }
    return row;
  }

  handleFilterChange(filter) {
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    this.setState({ filters: newFilters });
  }

  onClearFilters() {
    this.setState({filters: {} });
  }

  handleAddRow() {

    const newRow = {
      name: '', telephone: '', email: '', actions: ''
    };

    let rows = this.state.rows.slice();
    rows.unshift(newRow);

    this.setState({ rows });

  }

  handleSort(sortColumn, sortDirection){
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
    console.log(this.state);
  }

  createOrUpdateEmplooye(data, newField){
    const changedData = Object.assign(data, newField);
    changedData['username'] = changedData.cpf;
    if ( changedData.id === undefined 
      && 'email' in changedData 
      && 'name' in changedData 
      && 'surname' in changedData
      && 'cpf' in changedData
      && 'telephone' in changedData){
      //post
      console.log('post', changedData);
      fetch('/api/employee/employee/', {
        method: 'post',
        body: JSON.stringify(changedData),
        headers: Auth.getHeader()
      }).then((e) => e.json()).then((e) => {console.log(e);});
    }
    return changedData;
  }
  handleGridRowsUpdated(e) {
    const { fromRow, toRow, updated } = e;
    let rows = this.state.rows.slice();
    console.log(fromRow, toRow);
    console.log(updated);

    if(fromRow == toRow){
      const row = rows[fromRow];
      rows[fromRow] = this.createOrUpdateEmplooye(row,updated);
    }

    this.setState({ rows });
  }

  render() {
    //console.log(this.state._rows);
    return (
      <div className="container">
        <ReactDataGrid
          columns={this.state._columns}
          onGridSort={this.handleSort.bind(this)}
          rowGetter={this.rowGetter.bind(this)}
          enableCellSelect={true}
          rowsCount={this.getSize()}
          toolbar={<Toolbar
            enableFilter={true}
            onAddRow={this.handleAddRow} />}
          onAddFilter={this.handleFilterChange.bind(this)}
          onClearFilters={this.onClearFilters.bind(this)}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          rowHeight={46}
          columnWidth={120}
          minHeight={500} />
      </div>);
  }
}
