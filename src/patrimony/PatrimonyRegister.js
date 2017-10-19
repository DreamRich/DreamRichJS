import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import PatrimonyForm from './PatrimonyForm';
import RaisedButton from 'material-ui/RaisedButton';
import RealeStateSubForm from './RealeStateSubForm.js';
import PatrimonyStore from '../stores/PatrimonyStore';

export default class PatrimonyRegister extends Component {

  componentWillMount = () => {
    this.setState({
      ...PatrimonyStore.getState(),
      listener: PatrimonyStore.addListener(this.handleUpdate)
    });
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleUpdate = () => {
    this.setState(PatrimonyStore.getState());
  }

  submit = () => {
    this.form.submit();
  }

  render() {
    return (
      <div>
        <h1> Registro de Patrimonio </h1>

        <Paper className="Paper">
          <PatrimonyForm
            ref={ref=>this.form=ref}
          />
          <RealeStateSubForm
            parent_id={this.state.id}
          />
          <RaisedButton type='submit' primary label="Enviar" />
        </Paper>
      </div>
    );
  }
}
