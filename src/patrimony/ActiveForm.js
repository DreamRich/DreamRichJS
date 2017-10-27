import React, {Component} from 'react';
import {FormsyText, FormsySelect} from 'formsy-material-ui/lib';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import SubForm from '../components/SubForm';
//import RaisedButton from 'material-ui/RaisedButton';


export default class ActiveForm extends Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    parent_id: PropTypes.number,
    types: PropTypes.array,
  }

  componentWillMount = () => {
    AppDispatcher.dispatch({
      action: ActionType.ACTIVE.TYPE
    });
  }

  getOptions = () => {
    return this.props.types.map( (type) =>
      <MenuItem key={type.id} value={type.id} primaryText={type.name} />
    );
  }

  render = () => {
    return (
      <SubForm
        title="Ativo"
        parent_id={this.props.parent_id}
        parent_name="active_manager_id"
        name='active'
        action={ActionType.ACTIVE.FORM}
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
      </SubForm>
    );
  }
}


