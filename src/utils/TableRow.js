import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Check from 'material-ui/svg-icons/navigation/check';
import Delete from 'material-ui/svg-icons/action/delete';
// import {times} from 'lodash';
import {IconButton,
  Toggle,
  TextField,
  //RaisedButton,
  DatePicker,
} from 'material-ui';
// import FormsyDate from './formsyComponents/FormsyDate';
import format from 'date-fns/format';

import { Row/*, Col */ } from 'react-flexbox-grid';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';
import TableCell from './TableCell';

export default class TableRow extends Component {

  static propTypes = {
    row: PropTypes.object,
    headers: PropTypes.array,
    onDelete: PropTypes.func,
    onRowSelect: PropTypes.func,
    onRowUnselect: PropTypes.func,
    onChangeField: PropTypes.func,
    selectedRow: PropTypes.object,
    enableDelete: PropTypes.bool,
  }

  static defaultProps = {
    headers: [],
    row: {},
    enableDelete: true,
    onDelete: () => {console.warn('need this onDelete function');},
    onRowSelect: (key) => {console.warn('need this onRowSelect' + key);},
    onRowUnselect: (row) => {console.warn('need this onRowUnselect', row);},
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  getCellValue = (cell) => {
    const id = cell && cell.id;
    const type = cell && cell.type;
    const selected = cell && cell.selected;
    const name = cell && cell.name;
    if (selected && cell && this.props.selectedRow.data[name]) {
      cell.value = this.props.selectedRow.data[name];
    } else if (selected && cell) {
      cell.value= '';
    }
    const value = cell && cell.value;
    const rowId = cell && cell.rowId;
    const header = cell && cell.header;
    const width = cell && cell.width;
    const textFieldId = [id, rowId, header].join('-');
    const datePickerId = [id, rowId, header].join('-');

    const textFieldStyle = { width: width };

    const datePickerStyle = { width: width };

    // Set a new state to the row is being edited

    if (header || (type && type === 'ReadOnly')) {
      return <p style={{color: '#888'}}>{value}</p>;
    }

    // Select the field to show
    if (type) {
      if (type === 'TextField') {
        return <TextField
          name={name}
          id={textFieldId}
          onChange={this.props.onChangeField}
          style={textFieldStyle}
          value={value}
          disabled={!selected}
        />;
      }
      if (type === 'DatePicker') {
        /* bind the onChange from date picker because the default is a null
        * (null, date) and it break the logic of onChangeField wich uses the
        * event.target.name to set state */

        // Conditional props
        const dateValue = value ? {value: this.buildDate(value)} : {};

        return <DatePicker
          name={name}
          id={datePickerId}
          onChange={(e, date) => this.props.onChangeField(
            {target: {name: name}}, date.toISOString().slice(0,10))
          }
          mode='landscape'
          style={datePickerStyle}
          disabled={!selected}
          formatDate={(date) => format(date, 'DD/MM/YYYY')}
          {...dateValue}
        />;
      }
      if (type === 'Toggle') {
        return <Toggle
          onToggle={this.props.onChangeField}
          toggled={value}
          disabled={!selected}/>;
      }
    }

  }

  renderRow = (row) => {
    const rowStyle = {
      padding: row.header ? 0 : 12,
    };


    const rowId = row.key;
    const rowKey = ['row', rowId].join('-');

    const selected = row.selected || false;

    const button = selected ? <Check /> : <ModeEdit />;
    const tooltip = selected ? 'Done' : 'Edit';

    const onDeleteRow = () => this.props.onDelete(rowId);

    const onClick = () => {
      if (selected) {
        this.props.onRowUnselect(row);
      } else {
        this.props.onRowSelect(row);
      }
    };

    const deleteButton = (!this.props.enableDelete || selected || row.header) ? 
      <div className='delete-button' />
      : <IconButton className='delete-button' tooltip={'Delete this row'} onClick={onDeleteRow}>
        <Delete />
      </IconButton>;

    const checkbox = row.header ? <div className='check-box' />
      : <IconButton className='check-box' tooltip={tooltip} onClick={onClick}>
        {button}
      </IconButton>;

    return (
      <div key={rowKey} className='row table-row' style={rowStyle} >
        {checkbox}
        {this.props.headers.map( (header, id) => {
          const width = header.width;
          const cellStyle = {
            width: width || 200
          };
          const columnKey = ['column', id].join('-');
          const columnData = {
            'value': row.data[header.name],
            'width': cellStyle.width,
            'selected': selected,
            'rowId': rowId,
            'id': id,
            'name': header.name,
          };
          return (
            <TableCell
              key={columnKey}
              cell={columnData}
              style={cellStyle}
              type={header.type}
              header={row.header}
              onChangeField={this.props.onChangeField}
              selectedRow={this.props.selectedRow} />
          );
        })}
        {deleteButton}
      </div>
    );
  }

  // componentWillReceiveProps = (nextProps) => {
  // Transition to receive a new row and add it in editRow state
  // }

  buildDate = (value) => {
    if (value){
      let date = new Date(value);
      date = new Date(date.getTime() + date.getTimezoneOffset()*60000);
      return date;
    }
    return undefined;
  }

  render = () => {

    const row = this.props.row;

    return (
      <Row>
        {this.renderRow(row)}
      </Row>
    );
  }
}

