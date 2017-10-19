import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import PatrimonyForm from './PatrimonyForm';

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
        </Paper>
      </div>
    );
  }
}
