import ReactDataGrid from 'react-data-grid';
import React, {Component} from 'react';
import getData from '../resources/getData';
import {Data} from 'react-data-grid-addons';
import '../stylesheet/Table.sass';

export default class GridTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _columns: this.getColumns(),
      rows: [], filters: {}, sortDirection: null,
      sortColumn: null};
    this.getRows = this.getRows.bind(this);
  }

  /* Need override */
  getColumns(){return [];}

  /* Need override */
  getRoute(){return '';}

  /* Need override */
  getActions(register){ register; return null; }

  componentWillMount(){ getData(this.getRoute(), this, 'rows');}

  getRows() {
    return Data.Selectors.getRows(this.state);
  }

  getSize(){
    return this.getRows().length;
  }

  rowGetter(i) {
    const row = this.getRows()[i];
    if(row !== undefined && row !== null){
      row['actions'] = this.getActions(row);
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

  handleSort(sortColumn, sortDirection){
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <ReactDataGrid
          {...this.props}
          columns={this.state._columns}
          onGridSort={this.handleSort.bind(this)}
          rowGetter={this.rowGetter.bind(this)}
          rowsCount={this.getSize()}
          toolbar={this.getToolbar()}
          onAddFilter={this.handleFilterChange.bind(this)}
          onClearFilters={this.onClearFilters.bind(this)}
          rowHeight={46}
          columnWidth={120}
          minHeight={500} />
      </div>);
  }
}
