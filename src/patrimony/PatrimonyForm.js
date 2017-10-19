import React, {Component} from 'react';
import {Form} from 'formsy-react';
import {FormsyText} from 'formsy-material-ui/lib';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import PatrimonyStore from '../stores/PatrimonyStore';

export default class PatrimonyForm extends Component {

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
