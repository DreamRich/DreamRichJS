/* eslint-disable */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Check from 'material-ui/svg-icons/navigation/check';
import Delete from 'material-ui/svg-icons/action/delete';
import {times} from 'lodash';
import {IconButton,
  Toggle,
  TextField,
  RaisedButton,
  DatePicker} from 'material-ui';

import { Row, Col } from 'react-flexbox-grid';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class TableRow extends Component {

  static propTypes = {
    onDelete: PropTypes.func,
    onRowSelect: PropTypes.func,
    onRowUnselect: PropTypes.func,
    onChangeField: PropTypes.func,
    selectedRow: PropTypes.object,
  }

  static defaultProps = {
    headers: [],
    row: {},
    enableDelete: true,
    onChange: () => {console.warn('onChange not implemented');},
    onDelete: () => {console.warn('need this onDelete function');},
    onRowSelect: (key) => {console.warn('need this onRowSelect' + key);},
    onRowUnselect: (row) => {console.warn('need this onRowUnselect');},
  }

  contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  }

  getCellValue = (cell) => {
    const id = cell && cell.id;
    const type = cell && cell.type;
    const selected = cell && cell.selected;
    const name = cell && cell.name;
    if (selected && cell && this.props.selectedRow.data[name]) {
      cell.value = this.props.selectedRow.data[name];
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
      return <p style={{color: '#888'}}>{value}</p>
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
        return <DatePicker
          name={name}
          id={datePickerId}
          onChange={(e, date) => this.props.onChangeField(
            {target: {name: name}}, date)
          }
          mode='landscape'
          style={datePickerStyle}
          value={value}
          disabled={!selected}
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
      width: '100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      padding: row.header ? 0 : 12,
      border: 0,
      borderBottom: '1px solid #ccc',
      height: 50
    };
    const checkboxStyle = {
      display: 'flex',
      flexFlow: 'row nowrap',
      width: 50,
      height: 24,
      alignItems: 'center'
    };

    const deleteButtonStyle = {
      display: 'flex',
      flexFlow: 'row nowrap',
      width: 50,
      height: 24,
      alignItems: 'center',
      padding: '0 12 0'
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
      <div style={deleteButtonStyle} />
      : <IconButton style={deleteButtonStyle} tooltip={'Delete this row'} onClick={onDeleteRow}>
        <Delete />
      </IconButton>;

      const checkbox = row.header ? <div style={checkboxStyle} />
      : <IconButton style={checkboxStyle} tooltip={tooltip} onClick={onClick}>
        {button}
      </IconButton>;

      return (
        <div key={rowKey} className='row' style={rowStyle}>
          {checkbox}
          {this.props.headers.map( (header, id) => {
            const width = header.width;
            const cellStyle = {
              display: 'flex',
              flexFlow: 'row nowrap',
              flexGrow: 0.15,
              flexBasis: 'content',
              alignItems: 'center',
              height: 30,
              width: width || 200
            };
            const columnKey = ['column', id].join('-');
            let column = null;
            if (row.data) {
              const columnData = {
                'value': row.data[header.name],
                'width': cellStyle.width,
                'selected': selected,
                'rowId': rowId,
                'id': id,
                'name': header.name,
                'header': row.header,
                'type': header.type,
              };
              column = this.getCellValue(columnData);
            }
            return (
              <div key={columnKey} className='cell' style={cellStyle}>
                <div>
                  {column}
                </div>
              </div>
            );
          })}
          {deleteButton}
        </div>
      )
  }

  // componentWillReceiveProps = (nextProps) => {
    // Transition to receive a new row and add it in editRow state
  // }

  render = () => {

    const row = this.props.row;

    return (
      <Row>
        {this.renderRow(row)}
      </Row>
    );
  }
}

