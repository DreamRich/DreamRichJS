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

export default class EditTable extends Component {

  static propTypes = {
    onDelete: PropTypes.func.isRequired,
  }

  static defaultProps = {
    headers: [],
    rows: [],
    enableDelete: true,
    onChange: () => {console.warn('need this props');},
    onDelete: () => {console.warn('need this props');},
    onAdd: undefined
  }

  state = {
    rows: this.props.rows,
    hoverValue: false,
    currentRow: false
  }

  contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  }

  update = () => {
    const row = this.props.rows.filter((row) => row.selected );
    this.props.onChange(row[0]);
  }

  getCellValue = (cell) => {
    const self = this;
    const id = cell && cell.id;
    const type = this.props.headers.map((header) => header.type )[id];
    const selected = cell && cell.selected;
    const value = cell && cell.value;
    const rowId = cell && cell.rowId;
    const header = cell && cell.header;
    const width = cell && cell.width;
    const textFieldId = [id, rowId, header, 'text'].join('-');
    const datePickerId = [id, rowId, header, 'date'].join('-');

    const textFieldStyle = { width: width };

    const datePickerStyle = { width: width };

    const onTextFieldChange = (e) => {
      const target = e.target;
      const value = target.value;
      var rows = self.state.rows;
      rows[rowId].columns[id].value = value;
      self.setState({rows: rows});
    }

    const onDatePickerChange = (e, date) => {
      var rows = self.state.rows;
      rows[rowId].columns[id].value = date;
      self.setState({rows: rows});
    }

    const onToggle = (e) => {
      var rows = self.state.rows;
      rows[rowId].columns[id].value = !rows[rowId].columns[id].value;
      self.setState({rows: rows});
    }

    if (header || (type && type === 'ReadOnly')) {
      return <p style={{color: '#888'}}>{value}</p>
    }

    if (type) {
      if (selected) {
        if (type === 'TextField') {
          return <TextField
            id={textFieldId}
            onChange={onTextFieldChange}
            style={textFieldStyle}
            value={value}
          />;
        }
        if (type === 'DatePicker') {
          return <DatePicker
            id={datePickerId}
            onChange={onDatePickerChange}
            mode='landscape'
            style={datePickerStyle}
            value={value}
          />;
        }
        if (type === 'Toggle') {
          return <Toggle onToggle={onToggle} toggled={value} />;
        }
      } else {
        if (type === 'Toggle') {
          return <Toggle disabled onToggle={onToggle} toggled={value} />;
        }
        if (type === 'DatePicker') {
          return <DatePicker
            id={datePickerId}
            onChange={onDatePickerChange}
            mode='landscape'
            style={datePickerStyle}
            value={value}
            disabled={Boolean(true)}
          />;
        }
      }
    }

    return <TextField
      id={textFieldId}
      style={textFieldStyle}
      disabled
      value={value}
    />;
  }

  renderHeader = () => {
    const headerColumns = this.props.headers;
    const columns = headerColumns.map((column, id) => {
      return {value: column.value}
    });
    const row = {columns: columns, header: true};

    return this.renderRow(row);
  }

  renderRow = (row) => {
    const self = this;
    const columns = row.columns;
    const indexRow = row.key;
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

    const rowId = row.id;
    const rowKey = ['row', rowId].join('-');

    const onRowClick = function (e) {
      var rows = self.state.rows;
      rows.forEach((row, i) => {
        if (rowId !== i) row.selected = false;
      })
      rows[rowId].selected = !rows[rowId].selected;
      self.setState({rows: rows});
    };

    const r = self.state.rows[rowId];
    const selected = (r && r.selected) || false;

    const button = selected ? <Check /> : <ModeEdit />;
    const tooltip = selected ? 'Done' : 'Edit';

    const onDeleteRow = () => this.props.onDelete(indexRow);

    const onClick = function (e) {
      if (selected) {
        self.update();
      }

      onRowClick(e)
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
          {columns.map((column, id) => {
            const width = this.props.headers.map((header) => {
              return (header && header.width) || false
            })[id]
            const cellStyle = {
              display: 'flex',
              flexFlow: 'row nowrap',
              flexGrow: 0.15,
              flexBasis: 'content',
              alignItems: 'center',
              height: 30,
              width: width || 200
            }
            const columnKey = ['column', id].join('-')
            column.selected = selected
            column.rowId = rowId
            column.id = id
            column.header = row.header
            column.width = cellStyle.width
            return (
              <div key={columnKey} className='cell' style={cellStyle}>
                <div>
                  {this.getCellValue(column)}
                </div>
              </div>
            )
          })}
          {deleteButton}
        </div>
      )
  }

  addElement = (onButtonClick) => {
    const action = this.props.onAdd || onButtonClick;
    return (
        <Col xs={12} style={{marginTop: '30px'}}>
          <Row center="xs">
            <Col xs={6}>
              <FloatingActionButton key='0' onClick={action}>
                <ContentAdd />
              </FloatingActionButton>
            </Col>
          </Row>
        </Col>
    );
  }

  getHeader = (listHeader) => {

    const header = listHeader.map((element, index)=> {
      return (
        <Col key={'headerColumnTable'+index} xs>
          <h1>{element}</h1>
        </Col>
      );
    });

    return (<Row>{header}</Row>);
  }

  render = () => {
    const self = this;
    const style = {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Roboto, sans-serif'
    };

    const buttonStyle = {
      display: 'flex',
      flexFlow: 'row nowrap',
      marginTop: 10
    };

    const rows = this.props.rows;
    const columnTypes = this.props.headers.map((header) => header.type );

    const onButtonClick = (e) => {
      const newColumns = times(columnTypes.length, (index) => {
        const defaults = {
          'TextField': '',
          'Toggle': true
        };

        const value = defaults[columnTypes[index]];

        return {value: value};
      });

      const updatedRows = rows.map((row) => {
        if (row.selected) {
          self.update();
          row.selected = false;
        }
        return row;
      });
      updatedRows.push({columns: newColumns, selected: true});
      self.setState({rows: updatedRows});
    }

    return (
      <Row>
        {this.renderHeader()}
        {rows.map((row, id) => {
          row.id = id
          return this.renderRow(row)
        })}
        {this.addElement(onButtonClick)}
      </Row>
    );
  }
}

