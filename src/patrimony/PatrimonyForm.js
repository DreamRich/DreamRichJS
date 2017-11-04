import React, {Component} from 'react';
import Formsy from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';

export default class PatrimonyForm extends Component {

  submitForm = (data) => AppDispatcher.dispatch({
    action: ActionType.PATRIMONY.FORM,
    data: data,
  })

  submit = () => {
    this.form.submit();
  }

  render = () => {
    return (
      <Formsy.Form
        ref={ref => this.form = ref}
        onValidSubmit={this.submitForm}
      >
        <FormsyText
          name='fgts'
          validations='isNumeric'
          validationError='Esse campo precisa ser numérico'
          hintText='O quanto você recebe de fgts?'
          floatingLabelText='FGTS'
        />
      </Formsy.Form>
    );
  }
}
