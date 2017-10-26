import React, {Component} from 'react';
import ClientSubForm from '../client/ClientSubForm.js';
import ActionType from '../actions/ActionType.js';
import PropTypes from 'prop-types';
import {FormsyText, /* FormsyCheckbox, FormsyDate*/} from 'formsy-material-ui/lib';
import FormsyToggleYesNo from '../components/FormsyToggleYesNo';

export default class RealeStateSubForm extends Component {

  static propTypes = {
    parent_id: PropTypes.number
  }

  render = () => {
    return(
      <ClientSubForm
        title="Bens imobiliários"
        parent_id={this.props.parent_id}
        parent_name="patrimony_id"
        name="realestate"
        action={ActionType.PATRIMONY.SUBFORM}
      >
        <div>
          <FormsyText
            name="name"
            floatingLabelText="Nome"
            hintText="Nome do bem" />
          <FormsyText
            name="value"
            floatingLabelText="Valor"
            hintText="Valor do bem" />
          <FormsyToggleYesNo
            name="salable"
            label="É vendavel?"
            labelPosition='left'
          />
        </div>
      </ClientSubForm>
    );
  }
}

