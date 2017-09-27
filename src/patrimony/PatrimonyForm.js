import React, {Component} from 'react';
import {Form} from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import {Auth} from '../auth/Auth';

export default class Employeer extends Component {

  submit(data){
    fetch('/api/patrimony/',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: Auth.getHeader(),
      }
    ).then((e) => e.json()) 
     .then((e) => console.log(e));
  }

  render() {
    return (
      <Form onValidSubmit={this.submit}
        onValid={() => true}
        onInvalid={() => true}
        onInvalidSubmit={() => console.log('Deu ruim')}
      >
        <FormsyText
          name='fgts'
          validations='isNumeric'
          validationError='Esse campo precisa ser numérico'
          hintText='O quanto você recebe de fgts?'
          floatingLabelText='FGTS'
        />
        <button type='submit'>x</button>
      </Form>
    );
  }
}
