import ReactDataGrid from 'react-data-grid';
import React, {Component} from 'react';
import getData from '../resources/getData';

export default class ClientTable extends Component {
  constructor(props) {
    super(props);
    this.state = {_columns: [
      { key: 'name', name: 'Name' },
      { key: 'cpf', name: 'CPF' },
      { key: 'telephone', name: 'Telefone' },
      { key: 'email', name: 'Email' } ],
      _rows: []};
  }

  componentDidMount(){ getData('/api/client/active/', this, '_rows');}

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
    console.log(this.state._rows);
    return  (
      <ReactDataGrid
        columns={this.state._columns}
        rowGetter={this.rowGetter.bind(this)}
        rowsCount={this.state._rows.length}
        minHeight={500} />);
  }
}
