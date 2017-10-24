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

  submitBase = (event) => {
    event.preventDefault();
    AppDispatcher.dispatch({
      actionType: ActionType.ACTIVE.MANAGER,
      data: {patrimony_id: 1/*this.props.patrimony_id*/}
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
        {this.state.actives.map( idx => 
          <div key={idx}>
            <ActiveForm
              parent_id={this.state.id}
              types={this.state.types}
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
          onClick={this.add} 
          label='Adicionar'
        />
        <form 
          onSubmit={this.submitBase}
        >
          <RaisedButton
            primary
            type="submit"
            label="Enviar"
          />
        </form>
      </Paper>
    );
  }
}

ActiveRegister.propTypes = {
  patrimony_id: PropTypes.number,
};
