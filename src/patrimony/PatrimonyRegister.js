import React, {Component} from 'react';
import {Form} from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import {Auth} from '../auth/Auth';
import patrimonyRoutes from '../routes/PatrimonyRoutes.js';
import Paper from 'material-ui/Paper';
import PatrimonyForm from './PatrimonyForm.js';

export default class PatrimonyRegister extends Component {

  submit = (data) => {

    var that = this;

    fetch(patrimonyRoutes[this.name],
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: Auth.getHeader(),
      }
    )
    .then(((response) => {
      var data = {};

      if(response.ok) {
        console.log(this.name + ' was submitted');
        data = response.json();
      } else {
        throw new Error (this.name + ' could not be submitted');
      }
      return data;
    }))
    .then((data) => {
      for (var form in that.forms) {
        that.forms[form].inputs[0].setValue(data.id);
        that.forms[form].submit();
      }
      console.log(data.id);
    })
    .catch((error) => {
      console.error(error.message);
    });
  }

  render() {
    return (
      <div>
        <h1> Registro de Patrimonio </h1>

        <Paper className="Paper">
          <PatrimonyForm />
        </Paper>
      </div>
    );
  }
}
