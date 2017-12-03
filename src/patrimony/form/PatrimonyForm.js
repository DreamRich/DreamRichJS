import React, {Component} from 'react';
import {FormsyText} from 'formsy-material-ui/lib';
import ActionType from '../../actions/ActionType';
import PropTypes from 'prop-types';
import SubForm from '../../components/SubForm';
import CardForm from '../../components/CardForm';

export default class PatrimonyForm extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    canSubmit: PropTypes.bool,
  }

  getContentCard = () => (
    <FormsyText
      name='fgts'
      validations='isNumeric'
      validationError='Esse campo precisa ser numérico'
      hintText='O quanto você recebe de fgts?'
      floatingLabelText='FGTS'
      value={ this.props.data.fgts || '0' }
    />
  )

  render = () => {
    return (
      <SubForm
        title="Patrimônio"
        name="patrimony"
        action={ActionType.PATRIMONY.POSTFORM}
        canSubmit={this.props.canSubmit}
      >
        <CardForm
          titleCard={'Fundo de Garantia do Tempo de Serviço'}
          subtitleCard={'Insira valor do FGTS ou 0 caso não tenha'}
          contentCard={this.getContentCard()}
        />
      </SubForm>
    );
  }
}
