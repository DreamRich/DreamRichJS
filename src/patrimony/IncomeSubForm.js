import React, {Component} from 'react';
import SubForm from '../components/SubForm.js';
import ActionType from '../actions/ActionType.js';
import PropTypes from 'prop-types';
import {FormsyText , /*FormsyCheckbox, FormsyDate*/} from 'formsy-material-ui/lib';
import FormsyToggleYesNo from '../components/FormsyToggleYesNo';
import CardForm from '../components/CardForm';

export default class IncomeSubForm extends Component {

  static propTypes = {
    parent_id: PropTypes.number,
    data: PropTypes.object,
    index: PropTypes.number,
    canSubmit: PropTypes.bool,
  }

  getContentCard = () => (<div>
    <FormsyText
      name="source"
      floatingLabelText="Nome"
      hintText="Nome do bem"
      value={this.props.data.source}
    />
    <FormsyText
      name='value_monthly'
      floatingLabelText='Valor'
      hintText='Valor da receita mensal'
      value={this.props.data.value_monthly}
    />
    <FormsyToggleYesNo
      name="thirteenth"
      label="Tem décimo terceiro?"
      labelPosition='left'
      value={this.props.data.thirteenth}
    />
    <FormsyToggleYesNo
      name="vacation"
      label="Possui férias?"
      labelPosition='left'
      value={this.props.data.vacation}
    />
  </div>)

  render = () => {
    return(

      <SubForm
        title="Receitas"
        parent_id={this.props.parent_id}
        parent_name="patrimony_id"
        name="income"
        action={ActionType.PATRIMONY.POSTMULTIFORM}
        canSubmit={this.props.canSubmit}
        index={this.props.index}
      >
        <CardForm
          titleCard={'Receita'}
          subtitleCard={'Insira as informações da sua renda'}
          contentCard={this.getContentCard()}
        />
      </SubForm>
    );
  }

}

