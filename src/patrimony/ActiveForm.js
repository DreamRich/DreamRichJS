import React, {Component} from 'react';
import {Form} from 'formsy-react';
import {FormsyText, FormsySelect} from 'formsy-material-ui/lib';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
//import RaisedButton from 'material-ui/RaisedButton';


export default class ActiveForm extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    AppDispatcher.dispatch({
      actionType: ActionType.ACTIVE.TYPE
    });
  }

  componentWillUnmount = () => {
  }

  getOptions = () => {
    return this.props.types.map( (type) =>
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

  componentWillReceiveProps = (nextProps) => {
    if(!this.props.canSubmit && nextProps.canSubmit){
      this.form.submit();
    }
  }

  getValues = (data) => {
    AppDispatcher.dispatch({
      actionType: ActionType.ACTIVE.PROFIT,
      data: {
        [this.props.index]: {
          rate: data.rate,
          value: data.value,
        }
      }
    });
  }

  componentWillUnmount = () => {
    AppDispatcher.dispatch({
      actionType: ActionType.ACTIVE.DELETEPROFIT,
      index: this.props.index
    });
  }


  render = () => {
    return (
      <Form
        ref={ref => this.form = ref}
        onValidSubmit={this.submitForm}
        onChange={this.getValues}
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
          onChange={this.onRateChange}
        />
      </Form>
    );
  }
}

ActiveForm.propTypes = {
  patrimony_id: PropTypes.number,
  types: PropTypes.array,
  index: PropTypes.number,
  canSubmit: PropTypes.bool,
};

