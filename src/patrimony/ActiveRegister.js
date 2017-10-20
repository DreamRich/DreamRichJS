import React, {Component} from 'react';
import ActiveForm from './ActiveForm';
//import ActionType from '../actions/ActionType';
//import AppDispatcher from '../AppDispatcher';
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
    this.form.submit();
  }

  render = () => {
    return (
      <Paper className="Paper">
        <ActiveForm
          ref={ref => this.form = ref}
          patrimony_id={1/*this.props.patrimony_id*/}
          types={this.state.types}
        />
        <RaisedButton
          primary 
          type='submit'
          onClick={this.submit} 
          label='Enviar'
        />
      </Paper>
    );
  }
}

ActiveRegister.propTypes = {
  patrimony_id: PropTypes.number,
};
