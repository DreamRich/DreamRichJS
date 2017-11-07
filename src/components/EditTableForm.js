import React, {Component} from 'react';
import EditTable from 'material-ui-table-edit';
import { Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';

/*
const headers = [
  {value: 'Name', type: 'TextField', width: 150},
  {value: 'Address', type: 'TextField', width: 150},
  {value: 'Phone', type: 'TextField', width: 150},
  {value: 'Date', type: 'DatePicker', width: 50},
  {value: 'Enabled', type: 'Toggle', width: 50},
];

const rows = [
  {columns: [
    {value: 'Michael'},
    {value: '1212 Somewhere st.'},
    {value: '555-1212'},
    {value: new Date()},
    {value: false},
    {value: 'Michael at 4:20pm'}
  ]},
  {columns: [
    {value: 'Michael'},
    {value: '1212 Somewhere st.'},
    {value: '555-1212'},
    {value: new Date()},
    {value: false},
    {value: 'Michael at 4:20pm'}
  ]},
  {columns: [
    {value: 'Michael'},
    {value: '1212 Somewhere st.'},
    {value: '555-1212'},
    {value: new Date()},
    {value: false},
    {value: 'Michael at 4:20pm'}
  ]},
];
*/
const onChange = (row) => {
  console.log(row);
};

class EditTableForm extends Component {
  static propTypes = {
    rowsTable: PropTypes.array,
    headerTable: PropTypes.array,
  }

  render () {
    return (
      <Row around="xs">
        <EditTable
          onChange={onChange}
          rows={this.props.rowsTable}
          headerColumns={this.props.headerTable}
          enableDelete={true}
        />
      </Row>
    );
  }
}

export default EditTableForm;
