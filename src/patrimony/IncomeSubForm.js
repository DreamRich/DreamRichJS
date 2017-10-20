import React, {Component} from 'react';
import ClientSubForm from '../client/ClientSubForm.js';
import ActionType from '../actions/ActionType.js';
import PropTypes from 'prop-types';
import {FormsyText , /*FormsyCheckbox, FormsyDate*/} from 'formsy-material-ui/lib';
import FormsyToggleYesNo from '../components/FormsyToggleYesNo';

export default class IncomeSubForm extends Component {

  render = () => {
    return(
      <ClientSubForm
        title="Receitas"
        parent_id={this.props.parent_id}
        parent_name="patrimony_id"
        name="income"
        action={ActionType.PATRIMONY.SUBFORM}
      >
        <div>
          <FormsyText
            name="source"
            floatingLabelText="Nome"
            hintText="Nome do bem" />
          <FormsyText
            name="value_monthly"
            floatingLabelText="Valor"
            hintText="Valor da receita mensal" />
          <FormsyToggleYesNo
            name="thirteenth"
            label="Tem décimo terceiro?"
            labelPosition='left'
          />
          <FormsyToggleYesNo
            name="vacation"
            label="Possui férias?"
            labelPosition='left'
          />
        </div>
      </ClientSubForm>
    );
  }
}

IncomeSubForm.propTypes = {
  parent_id: PropTypes.number
};
