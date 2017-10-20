import React, {Component} from 'react';
import ClientSubForm from '../client/ClientSubForm.js';
import ActionType from '../actions/ActionType.js';
import PropTypes from 'prop-types';
import {FormsyText , /*FormsyCheckbox, FormsyDate*/} from 'formsy-material-ui/lib';

export default class ExtraSubForm extends Component {

  render = () => {
    return(
      <ClientSubForm
        title={this.props.title}
        parent_id={this.props.parent_id}
        parent_name="patrimony_id"
        name={this.props.name}
        action={ActionType.PATRIMONY.SUBFORM}
      >
        <div>
          <FormsyText
            name="name"
            floatingLabelText="Nome"
            hintText="" />
          <FormsyText
            name="value"
            floatingLabelText="Valor"
            hintText="Valor do patrimônio" />
        </div>
      </ClientSubForm>
    );
  }
}

ExtraSubForm.propTypes = {
  parent_id: PropTypes.number,
  title: PropTypes.string,
  name: PropTypes.string,
};
