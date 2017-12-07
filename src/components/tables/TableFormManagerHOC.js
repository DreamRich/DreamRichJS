import React, {Component} from 'react';


import PropTypes from 'prop-types';


import TableFormHOC from './TableFormHOC';

const TableFormManagerHOC = (actions, basicData, Store, getStoreState, managerCreator) => {

  const Table = TableFormHOC(actions, basicData, Store, getStoreState);

  return class TableFormManager extends Component {
    constructor(props){
      super(props);
      const { manager } = Store.getState();
      this.state = { manager };
    }

    static propTypes = {
      id: PropTypes.number,
    }

    componentWillMount = () => {
      this.setState({
        listener: Store.addListener(this.handleChange)
      });
      const {manager} = Store.getState();
      if (manager && manager.id === undefined && this.props.id) {
        managerCreator(this.props.id);
      }
    }

    componentWillUnmount = () => this.state.listener.remove()

    handleChange = () => this.setState(Store.getState())

    render = () => {
      return (
        <Table
          {...this.props}
          id={this.state.manager.id}
        />
      );
    }

  };
};

export default TableFormManagerHOC;
