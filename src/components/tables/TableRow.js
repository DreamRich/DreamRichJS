import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Check from 'material-ui/svg-icons/navigation/check';
import Delete from 'material-ui/svg-icons/action/delete';

import {IconButton} from 'material-ui';


import { Row/*, Col */ } from 'react-flexbox-grid';


import TableCell from './TableCell';

export default class TableRow extends Component {

  static propTypes = {
    options: PropTypes.object,
    row: PropTypes.object,
    headers: PropTypes.array,
    onDelete: PropTypes.func,
    onRowSelect: PropTypes.func,
    onRowUnselect: PropTypes.func,
    onChangeField: PropTypes.func,
    selectedRow: PropTypes.object,
    enableDelete: PropTypes.bool,
    enableEdit: PropTypes.bool,
  }

  static defaultProps = {
    headers: [],
    row: {},
    onDelete: () => {console.warn('need this onDelete function');},
    onRowSelect: (key) => {console.warn('need this onRowSelect' + key);},
    onRowUnselect: (row) => {console.warn('need this onRowUnselect', row);},
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
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

    const checkbox = (!this.props.enableEdit || row.header) ? <div className='check-box' />
      : <IconButton className='check-box' tooltip={tooltip} onClick={onClick}>
        {button}
      </IconButton>;

    return (
      <div key={rowKey} className='row table-row' style={rowStyle} >
        {checkbox}
        {this.props.headers.map( (header, id) => {
          const width = header.width;
          const cellStyle = { width: width || 200 };
          const columnKey = ['column', id].join('-');
          const options = header.options ? this.props.options : {};
          const columnData = {
            'value': row.data[header.name],
            'width': cellStyle.width,
            'selected': selected,
            'rowId': rowId,
            'id': id,
            'name': header.name,
            'options': options[header.options],
          };
          return (
            <TableCell
              key={columnKey}
              cell={columnData}
              style={cellStyle}
              type={header.type}
              header={row.header}
              onChangeField={this.props.onChangeField}
              selectedRow={this.props.selectedRow}
            />
          );
        })}
        {deleteButton}
      </div>
    );
  }

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

