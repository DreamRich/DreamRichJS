import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import PatrimonyForm from './PatrimonyForm';
import RaisedButton from 'material-ui/RaisedButton';

export default class PatrimonyRegister extends Component {

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
          <RaisedButton type='submit' primary label="Enviar" />
        </Paper>
      </div>
    );
  }
}
