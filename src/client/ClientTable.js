import ReactDataGrid from 'react-data-grid';
import React, {Component} from 'react';
import getData from '../resources/getData';
import {Data, Toolbar} from 'react-data-grid-addons';
import '../stylesheet/Table.sass';

export default class ClientTable extends Component {
  constructor(props) {
    super(props);
    this.state = {_columns: [
      { key: 'name', name: 'Name', sortable: true, filterable: true },
      { key: 'telephone', name: 'Telefone', sortable: true, filterable: true },
      { key: 'email', name: 'Email', sortable: true, filterable: true },
      { key: 'actions', name: 'Actions', locked: true, filterable: false }
    ],
      rows: [], original: [], filters: {}, sortDirection: null,
      sortColumn: null};
    this.getRows = this.getRows.bind(this);
    this.a = this.a.bind(this);
  }

  componentWillMount(){ getData('/api/client/active/', this, 'original', 'rows');}

  getRows() {
    return Data.Selectors.getRows(this.state);
  }
  
  getSize(){
    return this.getRows().length;
  }

  rowGetter(i) {
    const row = this.getRows()[i];
    row['actions'] = <div><a href="asd">A</a><a href="afd"> asdf</a></div>;
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

  handleSort(sortColumn, sortDirection){
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
    console.log(this.state);
  }

  render() {
    //console.log(this.state._rows);
    return  (
      <ReactDataGrid
        columns={this.state._columns}
        onGridSort={this.handleSort.bind(this)}
        rowGetter={this.rowGetter.bind(this)}
        enableCellSelect={true}
        rowsCount={this.getSize()}
        toolbar={<Toolbar enableFilter={true}/>}
        onAddFilter={this.handleFilterChange.bind(this)}
        onClearFilters={this.onClearFilters.bind(this)}
        rowHeight={50}
        disableCellDrag={true}
        minHeight={500} />);
  }
}
