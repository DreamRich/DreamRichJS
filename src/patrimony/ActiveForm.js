import React, {Component} from 'react';
import {Form} from 'formsy-react';
import {FormsyText, FormsySelect} from 'formsy-material-ui/lib';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import ActiveStore from '../stores/ActiveStore';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';


export default class ActiveForm extends Component {

  constructor(props) {
    super(props);
    this.state = ActiveStore.getState();
  }

  componentWillMount = () => {
    this.setState({
      listener: ActiveStore.addListener(this.handleUpdate)
    });

    AppDispatcher.dispatch({
      actionType: ActionType.ACTIVE.TYPE
    });
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleUpdate = () => {
    this.setState(ActiveStore.getState());
  }

  getOptions = () => {
    return this.state.types.map( (type) =>
      <MenuItem key={type.id} value={type.id} primaryText={type.name} />
    );
  }

  submitForm = (data) => {
    data.patrimony_id = this.props.patrimony_id;
    AppDispatcher.dispatch({
      actionType: ActionType.ACTIVE.FORM,
      data: data,
    });
  }

  submit = () => {
    this.form.submit();
  }

  render = () => {
    return (
      <Paper className="Paper">
        <Form
          ref={ref => this.form = ref}
          onValidSubmit={this.submitForm}
        >
          <FormsySelect
            name="active_type_id"
            floatingLabelText="Tipo"
            maxHeight={300}
          >
            {this.getOptions()}
          </FormsySelect>
          <FormsyText
            name='name'
            floatingLabelText='Nome'
            hintText='Nome de referência'
          />
          <FormsyText
            name='value'
            floatingLabelText='Valor investido'
            hintText='000.00'
          />
          <FormsyText
            name='rate'
            floatingLabelText='Taxa (%CDI)'
            hintText='100.0'
          />
        </Form>
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

ActiveForm.propTypes = {
  patrimony_id: PropTypes.number,
};
