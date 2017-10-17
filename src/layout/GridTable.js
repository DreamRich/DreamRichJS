import '../stylesheet/Table.sass';
import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';
import Snackbar from 'material-ui/Snackbar';
import {getData} from '../resources/Requests';
import {Data} from 'react-data-grid-addons';

export default class GridTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _columns: this.getColumns(),
      rows: [], filters: {}, sortDirection: null,
      sortColumn: null, open: false, message: ''};
    this.getRows = this.getRows.bind(this);
    this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
  }

  /* Need override */
  getColumns(){return [];}

  /* Need override */
  getRoute(){return '';}

  /* Need override */
  getActions(register, idx){ register, idx; return null; }

  createOrUpdate(row, updated){
    row; updated;
  }

  handleGridRowsUpdated(updates) {
    const { fromRow, toRow, updated } = updates;
    let rows = this.state.rows.slice();
    console.log(fromRow, toRow);
    console.log(updated);

    if(fromRow == toRow){
      const row = rows[fromRow];
      rows[fromRow] = this.createOrUpdate(row,updated);
    }

    this.setState({ rows });
  }

  componentWillMount(){ getData(this.getRoute(), (data) => this.setState({rows: data}));}

  getRows() {
    return Data.Selectors.getRows(this.state);
  }

  getSize(){
    return this.getRows().length;
  }

  rowGetter(i) {
    const row = this.getRows()[i];
    if(row !== undefined && row !== null){
      row['actions'] = this.getActions(row, i);
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
  }

  handleRequestClose(){
    this.setState({ open: false });
  }

  render() {
    return (
      <div className="container">
        <ReactDataGrid
          enableCellSelect={true}
          columns={this.state._columns}
          onGridSort={this.handleSort.bind(this)}
          rowGetter={this.rowGetter.bind(this)}
          rowsCount={this.getSize()}
          toolbar={this.getToolbar()}
          onAddFilter={this.handleFilterChange.bind(this)}
          onClearFilters={this.onClearFilters.bind(this)}
          onGridRowsUpdated={this.handleGridRowsUpdated}
          rowHeight={46}
          columnWidth={120}
          minHeight={500} />
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={9000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
      </div>);
  }
}
