import React, {Component} from 'react';
import ActiveForm from './ActiveForm';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import ActiveStore from '../stores/ActiveStore';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';


export default class ActiveRegister extends Component {

  constructor(props) {
    super(props);
    this.state = ActiveStore.getState();
  }

  componentWillMount = () => {
    this.setState({
      listener: ActiveStore.addListener(this.handleUpdate)
    });
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleUpdate = () => {
    this.setState(ActiveStore.getState());
  }

  submit = () => {
    AppDispatcher.dispatch({
      actionType: ActionType.ACTIVE.CANSUBMIT
    });
  }

  add = () => {
    AppDispatcher.dispatch({
      actionType: ActionType.ACTIVE.ADD
    });
  }

  remove = (id) => {
    AppDispatcher.dispatch({
      actionType: ActionType.ACTIVE.REMOVE,
      id: id
    });
  }

  render = () => {
    return (
      <Paper className="Paper">
        {this.state.totalProfit}
        {this.state.actives.map( idx => 
          <div key={idx}>
            <ActiveForm
              patrimony_id={1/*this.props.patrimony_id*/}
              types={this.state.types}
              canSubmit={this.state.submit}
              index={idx}
            />
            <RaisedButton
              primary 
              onClick={this.remove.bind(this, idx)} 
              label='Remover'
            />
          </div>
        )}
        <RaisedButton
          primary 
          type='submit'
          onClick={this.submit} 
          label='Enviar'
        />
        <RaisedButton
          primary 
          type='submit'
          onClick={this.add} 
          label='Adicionar'
        />
      </Paper>
    );
  }
}

ActiveRegister.propTypes = {
  patrimony_id: PropTypes.number,
};
