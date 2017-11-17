import React, {Component} from 'react';
// import TableForm from './TableForm';
// import { Row } from 'react-flexbox-grid';
// import PropTypes from 'prop-types';
// import AppDispatcher from '../../AppDispatcher';
// import {Card, CardTitle, CardText} from 'material-ui/Card';
import TableFormHOC from './TableFormHOC';

const TableFormManagerHOC = (actions, basicData, Store, getStoreState, managerCreator) => {

  const Table = TableFormHOC(actions, basicData, Store, getStoreState);

  return class TableFormManager extends Component {
    constructor(props){
      super(props);
      const { manager } = Store.getState();
      this.state = { manager };
    }

    componentWillMount = () => {
      this.setState({
        listener: Store.addListener(this.handleChange)
      });
      const {manager} = Store.getState();
      if (manager && manager.id === undefined) {
        managerCreator();
      }
    }

    componentWillUnmount = () => this.state.listener.remove()

    handleChange = () => this.setState(Store.getState())

    render = () => {
      return (
        <Table
          id={this.state.manager.id}
          {...this.props}
        />
      );
    }

  };
};

export default TableFormManagerHOC;
