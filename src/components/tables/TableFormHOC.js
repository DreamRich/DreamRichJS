import React, {Component} from 'react';
import TableForm from './TableForm';
import { Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import AppDispatcher from '../../AppDispatcher';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const TableFormHOC = (actions, basicData, Store, getStoreState) => {
  return class CardTableForm extends Component {
    constructor(props){
      super(props);
      this.state = {...getStoreState(), showDialog: false};
    }

    static propTypes = {
      id: PropTypes.number,
      enableDelete: PropTypes.bool,
      enableEdit: PropTypes.bool,
      enableAdd: PropTypes.bool,
      headers: PropTypes.array,
      modal: PropTypes.bool,
      expandable: PropTypes.bool,
      beforeSubmitRow: PropTypes.func,
    }

    static defaultProps = {
      enableDelete: true,
      enableEdit: true,
      enableAdd: true,
      modal: false,
      expandable: false,
      beforeSubmitRow: () => {}
    }

    componentWillMount = () => this.setState({
      listener: Store.addListener(this.handleChange)
    })

    componentWillUnmount = () => this.state.listener.remove()

    handleChange = () => {
      this.setState({...getStoreState()});
    }

    submitRow = (row) => {
      this.props.beforeSubmitRow(row);
      row.data[basicData.parentId] = this.props.id;
      AppDispatcher.dispatch({
        action: actions.submit,
        key: row.key,
        data: row.data,
        route: basicData.route,
        state: basicData.state,
      });
    }

    addRow = () => AppDispatcher.dispatch({
      action: actions.add,
      state: basicData.state,
    })

    confirmRemove = () => {
      AppDispatcher.dispatch({
        action: actions.remove,
        key: this.state.key,
        state: basicData.state,
        remove: true,
      });
      this.closeDialog();
    }

    closeDialog = () => {
      this.setState({showDialog: false, key: null});
    }

    removeRow = (key) => {
      this.setState({key, showDialog: true});
    }

    selectRow = (key) => AppDispatcher.dispatch({
      action: actions.select,
      key: key,
      state: basicData.state,
    })

    cancelRow = (key) => AppDispatcher.dispatch({
      action: actions.remove,
      key: key,
      state: basicData.state,
      remove: false,
    });

    getRowsTable = () => this.state.registers.map( (register) => {
      const {index, selected, ...rest} = register;
      return {
        'data': rest,
        'key': index,
        'selected': selected
      };
    })

    render = () => {
      const headers = this.props.headers || basicData.headers;

      const actions = [
        <FlatButton key={2} label="CANCELAR" onClick={this.closeDialog} />,
        <FlatButton key={1} label="CONFIRMAR" keyboardFocused={true}
          onClick={this.confirmRemove}
        />,
      ];

      return (
        <div>
          <Dialog
            title="Confirmar exclusão"
            actions={actions}
            modal={this.props.modal}
            open={this.state.showDialog}
            onRequestClose={this.closeDialog}
          >
            Você tem certeza que deseja excluir este registro?
          </Dialog>
          <Card className='Card' >
            <CardTitle
              actAsExpander={this.props.expandable}
              showExpandableButton={this.props.expandable}
              title={basicData.title}
              subtitle={basicData.subTitle}
            />
            <CardText expandable={this.props.expandable} >
              <Row around="xs">
                <TableForm
                  headers={headers}
                  rows={this.getRowsTable()}
                  onDelete={this.removeRow}
                  onCancel={this.cancelRow}
                  onChange={this.submitRow}
                  onAdd={this.addRow}
                  onRowSelect={(row) => this.selectRow(row.key)}
                  enableDelete={this.props.enableDelete}
                  enableEdit={this.props.enableEdit}
                  enableAdd={this.props.enableAdd}
                  options={this.state.options}
                />
              </Row>
            </CardText>
          </Card>
        </div>
      );
    }

  };
};

export default TableFormHOC;
