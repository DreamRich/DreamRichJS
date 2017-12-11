import React, {Component} from 'react';
import TableRow from './TableRow';
import PropTypes from 'prop-types';
import '../../stylesheet/TableEdit.sass';
import { Row, Col } from 'react-flexbox-grid';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import _ from 'lodash';

export default class TableForm extends Component {

  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onRowSelect: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    updatingRow: PropTypes.bool,
    headers: PropTypes.array,
    rows: PropTypes.array,
    enableDelete: PropTypes.bool,
    enableEdit: PropTypes.bool,
    enableAdd: PropTypes.bool,
    defaultRow: PropTypes.object,
  }

  static defaultProps = {
    headers: [],
    rows: [],
    defaultRow: {},
    enableDelete: true,
    enableEdit: true,
    enableAdd: true,
    onCancel: () => {console.warn('onCancel not implemented');},
    onChange: () => {console.warn('onChange not implemented');},
    onDelete: () => {console.warn('need this onDelete function');},
    onAdd: () => {console.warn('need this onAdd function');},
    onRowSelect: (key) => {console.warn('need this onRowSelect' + key);}
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  }

  state = {
    editRow: {data: this.props.defaultRow, key: -1},
    open: false,
    wait: undefined,
  }

  update = (row) => {
    // Only update if the row o state row is not in default configuration
    // this prevent requests in server
    if (!_.isEqual(row.data, this.props.defaultRow)
      || !_.isEqual(this.state.editRow.data, this.props.defaultRow) ) {
      if (this.state.editRow.key === row.key) {
        this.props.onChange(this.state.editRow);
      } else {
        this.props.onChange(row);
      }
    } else {
      console.log('row not changed to be add');
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

  getRowToUpdate = () => {
    const rowToUpdate = this.props.rows.filter( row => row.selected );
    return _.first(rowToUpdate);
  }

  rowWillUpdate = () => {
    const rowToUpdate = this.getRowToUpdate();
    if (rowToUpdate) {
      this.update(rowToUpdate);
      return true;
    }
    return false;
  }

  onRowUnselect = (row) => {
    this.update(row);
    this.removeWait();
  }

  componentWillReceiveProps = (nextProps) => {
    // Transition to receive a new row and add it in editRow state
    const selectedRow = nextProps.rows.filter( row => row.selected );
    if (selectedRow.length && this.state.editRow.key !== selectedRow[0].key) {
      this.setState({editRow: selectedRow[0]});
    } else if (!selectedRow.length) {
      this.setState({editRow: {data: this.props.defaultRow, key: -1}});
    }
  }

  removeWait = () => {
    // Remove the timeout of waitUpdate of onAdd method
    clearTimeout(this.state.wait);
    this.setState({wait: undefined});
  }

  componentWillUnmount = () => this.removeWait()

  onAdd = () => {
    // This check if the table will post some row to update
    const willUpdate = this.rowWillUpdate();
    if (!willUpdate) {
      this.props.onAdd();
    } else if (!this.state.wait) { // prevent multiples timeouts of user click like a crazy in button
      this.waitUpdate(500);
    }
  }

  waitUpdate = (time) => {
    const row = this.getRowToUpdate();
    if (!row) {
      this.onAdd();
      this.removeWait();
    } else {
      console.log('wait update', this.state.wait);
      const waitFor = 1000; // always wait 1 second for next check
      this.setState({wait: setTimeout(this.waitUpdate, time, waitFor)});
    }
  }

  onCancel = (key) => {
    this.props.onCancel(key);
    this.setState({editRow: {data: this.props.defaultRow, key: -1}});
    this.removeWait();
  }

  addElement = () => {
    // Add a new row submiting all others activates
    if (this.props.enableAdd) {
      return (
        <Col xs={12} className='add-element'>
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
    return null;
  }

  onChangeField = (e, value) => {
    // all fields need have e.target.name
    const target = e.target;
    const name = target.name;
    this.setState( prevState => {
      const {editRow} = prevState;
      editRow.data[name] = value;
      return { editRow };
    });
  }

  onRowSelect = (row) => {
    // Allows edit only one row
    const rowToUpdate = this.getRowToUpdate();
    if (!rowToUpdate) {
      this.setState({editRow: row});
      this.props.onRowSelect(row);
    } else {
      this.setState({open: true});
    }
  }

  handleClose = () => this.setState({open: false})


  render = () => {
    const {rows, ...rest} = this.props;
    const actions = [
      <FlatButton key={1} label="OK" onClick={this.handleClose} primary />
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          onRequestClose={this.handleClose}
          open={this.state.open}
        >
          Há uma outro registro sendo editado, termine ou cancele-o primeiro.
        </Dialog>
        <Col xs className='table-column' >
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
              onCancel={this.onCancel}
            />;
          })}
          {this.addElement()}
        </Col>
      </div>
    );
  }
}

