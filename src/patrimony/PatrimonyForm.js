import React, {Component} from 'react';
import {Form} from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';

export default class PatrimonyForm extends Component {

  submit = (data) => {
    AppDispatcher.dispatch({
      actionType: ActionType.PATRIMONY.FORM,
      data: data,
    });
  }

  submitForm = () => {
    this.form.submit();
  }

  render = () => {
    return (
      <Form onValidSubmit={this.submit}
        ref={ref => this.form = ref}
      >
        <FormsyText
          name='fgts'
          validations='isNumeric'
          validationError='Esse campo precisa ser numérico'
          hintText='O quanto você recebe de fgts?'
          floatingLabelText='FGTS'
        />
      </Form>
    );
  }
}
