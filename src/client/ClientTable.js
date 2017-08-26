import ReactDataGrid from 'react-data-grid';
import React, {Component} from 'react';

export default class ClientTable extends Component {
  constructor(props) {
    super(props);
    this.state = {_columns: [
      { key: 'id', name: 'ID' },
      { key: 'title', name: 'Title' },
      { key: 'count', name: 'Count' } ],
      _rows: []};
  }

  componentDidMount(){ this.createRows();}

  createRows() {
    let rows = [];
    for (let i = 1; i < 1000; i++) {
      rows.push({
        id: i,
        title: 'Title ' + i,
        count: i * 1000
      });
    }

    this.setState({_rows: rows});
  }

  rowGetter(i) {
    return this.state._rows[i];
  }

  render() {
    return  (
      <ReactDataGrid
        columns={this.state._columns}
        rowGetter={this.rowGetter.bind(this)}
        rowsCount={this.state._rows.length}
        minHeight={500} />);
  }
}
