import React, {Component} from 'react';
import EditTable from '../utils/EditTable';
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

class EditTableForm extends Component {
  static propTypes = {
    rows: PropTypes.array,
    headers: PropTypes.array,
    onDelete: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRowSelect: PropTypes.func.isRequired,
  }

  render () {
    return (
      <Row around="xs">
        <EditTable
          {...this.props}
          enableDelete={true}
        />
      </Row>
    );
  }
}

export default EditTableForm;
