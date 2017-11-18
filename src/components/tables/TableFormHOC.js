import React, {Component} from 'react';
import TableForm from './TableForm';
import { Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import AppDispatcher from '../../AppDispatcher';
import {Card, CardTitle, CardText} from 'material-ui/Card';

const TableFormHOC = (actions, basicData, Store, getStoreState) => {
  return class CardTableForm extends Component {
    constructor(props){
      super(props);
      this.state = getStoreState();
    }

    static propTypes = {
      id: PropTypes.number,
      enableDelete: PropTypes.bool,
      enableEdit: PropTypes.bool,
      enableAdd: PropTypes.bool,
      headers: PropTypes.array,
    }

    static defaultProps = {
      enableDelete: true,
      enableEdit: true,
      enableAdd: true,
    }

    componentWillMount = () => this.setState({
      listener: Store.addListener(this.handleChange)
    })

    componentWillUnmount = () => this.state.listener.remove()

    handleChange = () => {
      this.setState(getStoreState());
    }

    submitRow = (row) => {
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

    removeRow = (key) => {
      AppDispatcher.dispatch({
        action: actions.remove,
        key: key,
        state: basicData.state,
      });
    }

    getRowsTable = () => this.state.registers.map( (register) => {
      const {index, selected, ...rest} = register;
      return {
        'data': rest,
        'key': index,
        'selected': selected
      };
    })

    selectRow = (key) => AppDispatcher.dispatch({
      action: actions.select,
      key: key,
      state: basicData.state,
    })

    render = () => {
      const subtitleCard = basicData.subTitle;

      const headers = this.props.headers || basicData.headers;

      return (
        <Card className='Card' >
          <CardTitle
            title={basicData.title}
            subtitle={subtitleCard}
          />
          <CardText>
            <Row around="xs">
              <TableForm
                headers={headers}
                rows={this.getRowsTable()}
                onDelete={this.removeRow}
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
      );
    }

  };
};

export default TableFormHOC;
