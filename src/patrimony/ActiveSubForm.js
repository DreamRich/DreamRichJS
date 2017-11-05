import React, {Component} from 'react';
import {FormsyText, FormsySelect} from 'formsy-material-ui/lib';
import ActionType from '../actions/ActionType';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import SubForm from '../components/SubForm';
//import RaisedButton from 'material-ui/RaisedButton';


export default class ActiveSubForm extends Component {

  static propTypes = {
    parent_id: PropTypes.number,
    types: PropTypes.array,
    data: PropTypes.object,
    index: PropTypes.number,
    canSubmit: PropTypes.bool,
  }

  getOptions = () => {
    return this.props.types.map( (type) =>
      <MenuItem key={type.id} value={type.id} primaryText={type.name} />
    );
  }

  render = () => {
    const type = this.props.data.active_type || {};
    return (
      <SubForm
        title="Ativo"
        parent_id={this.props.parent_id}
        parent_name="active_manager_id"
        name='actives'
        action={ActionType.PATRIMONY.POSTMULTIFORM}
        index={this.props.index}
        canSubmit={this.props.canSubmit}
      >
        <div>
          <FormsySelect
            name="active_type_id"
            floatingLabelText="Tipo"
            maxHeight={300}
            value={type.id}
          >
            {this.getOptions()}
          </FormsySelect>
          <FormsyText
            name='name'
            floatingLabelText='Nome'
            hintText='Nome de referência'
            value={this.props.data.name}
          />
          <FormsyText
            name='value'
            floatingLabelText='Valor investido'
            hintText='000.00'
            value={this.props.data.value}
          />
          <FormsyText
            name='rate'
            floatingLabelText='Taxa (%CDI)'
            hintText='100.0'
            value={this.props.data.rate}
            onChange={this.onRateChange}
          />
        </div>
      </SubForm>
    );
  }
}


