import React, {Component} from 'react';
// import ActiveStore from '../stores/ActiveStore';
// import AppDispatcher from '../AppDispatcher';
// import ActionType from '../actions/ActionType';
import PropTypes from 'prop-types';

export default class ActiveProfit extends Component {

  static propTypes = {
    match: {params: {id: PropTypes.number,}}
  }

  componentWillMount = () => {
    /*   this.setState({
      ...ActiveStore.getState(),
      listener: ActiveStore.addListener(this.handleUpdate)
    });
    */
    // const id = this.props.match.params.id;
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleUpdate = () => {
    // this.setState(ActiveStore.getState());
  }

  render() {
    return (
      <div>
        <h1> Carteira </h1>
        {
          this.state.actives.map( (item, idx) => {
            const type = (item.active_type !== undefined ? item.active_type.name : '');
            return (
              <div key={idx}>
                <label>{type} {item.name}: {item.value} {item.equivalent_rate}</label>
              </div>
            );
          })
        }
        <h1> Carteira diferença </h1>
        <label>Rentabilidade da carteira: {this.state.profit}</label>
        <br />
        <label>Ganho real: {this.state.profit}</label>
        <br />
        <label>Ganho sugerido: {this.state.sugest}</label>
        <br />
        <label>Diferença: {this.state.difference}</label>
        <br />
        <label>Total: {this.state.total}</label>
        <br />
        <label>Ganho atual: {this.state.total_atual}</label>
        <br />
        <label>Ganho sugerido: {this.state.total_sugest}</label>
        <br />
        <label>Diferença ganha: {this.state.total_difference}</label>
      </div>
    );
  }
}
