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

  onCancel = (key) => {
    this.props.onCancel(key);
    this.setState({editRow: {data: {}, key: -1}});
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
    this.rowWillUpdate();
    this.setState({editRow: row});
    this.props.onRowSelect(row);
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

