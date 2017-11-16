import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
// import Check from 'material-ui/svg-icons/navigation/check';
// import Delete from 'material-ui/svg-icons/action/delete';
// import {times} from 'lodash';
/* import {
  IconButton,
  Toggle,
  TextField,
  RaisedButton,
  DatePicker} from 'material-ui';
*/

import { Row, Col } from 'react-flexbox-grid';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TableRow from './TableRow';

import '../stylesheet/TableEdit.sass';

export default class EditTable extends Component {

  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRowSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    headers: PropTypes.array,
    rows: PropTypes.array,
  }

  static defaultProps = {
    headers: [],
    rows: [],
    enableDelete: true,
    onChange: () => {console.warn('onChange not implemented');},
    onDelete: () => {console.warn('need this onDelete function');},
    onAdd: () => {console.warn('need this onAdd function');},
    onRowSelect: (key) => {console.warn('need this onRowSelect' + key);}
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  state = {
    editRow: {data: {}, key: -1}
  }

  update = (row) => {
    if (this.state.editRow.key === row.key) {
      this.props.onChange(this.state.editRow);
    } else {
      this.props.onChange(row);
    }
  }

  renderHeader = () => {
    const columns = {};

    this.props.headers.forEach( column => {
      columns[column.name] = column.value;
    });

    const row = {data: columns, header: true};

    return <TableRow {...this.props} row={row} />;
  }

  rowWillUpdate = () => {
    this.props.rows.forEach( row => {
      if (row.selected) {
        this.update(row);
      }
    });
  }

  onRowUnselect = (row) => {
    this.update(row);
  }

  componentWillReceiveProps = (nextProps) => {
    // Transition to receive a new row and add it in editRow state
    const selectedRow = nextProps.rows.filter( row => row.selected );
    if (selectedRow.length && this.state.editRow.key !== selectedRow[0].key) {
      this.setState({editRow: selectedRow[0]});
    } else if (!selectedRow.length) {
      this.setState({editRow: {data: {}, key: -1}});
    }
  }

  onAdd = () => {
    this.rowWillUpdate();
    this.props.onAdd();
  }

  addElement = () => {
    // Add a new row submiting all others activates
    return (
      <Col xs={12} style={{marginTop: '30px'}}>
        <Row center="xs">
          <Col xs={6}>
            <FloatingActionButton key='0' onClick={this.onAdd}>
              <ContentAdd />
            </FloatingActionButton>
          </Col>
        </Row>
      </Col>
    );
  }

  onChangeField = (e, value) => {
    const target = e.target;
    const name = target.name;
    this.setState( prevState => {
      const {editRow} = prevState;
      editRow.data[name] = value;
      return { editRow };
    });
  }

  onRowSelect = (row) => {
    this.rowWillUpdate();
    this.setState({editRow: row});
    this.props.onRowSelect(row);
  }

  render = () => {
    const {rows, ...rest} = this.props;

    return (
      <Row>
        {this.renderHeader()}
        {rows.map( (row, idx) => {
          return <TableRow
            {...rest}
            key={idx}
            row={row}
            onRowUnselect={this.onRowUnselect}
            onRowSelect={this.onRowSelect}
            onChangeField={this.onChangeField}
            selectedRow={this.state.editRow}
          />;
        })}
        {this.addElement()}
      </Row>
    );
  }
}

