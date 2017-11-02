import React, {Component} from 'react';
import errorMessages from '../../utils/FormsErrorMessages';
import { Row, Col } from 'react-flexbox-grid';
import SubForm from '../../components/SubForm';
import FormsyDate from '../../utils/formsyComponents/FormsyDate';
import PropTypes from 'prop-types';
import makeFormysTextList from '../../utils/MakeFormysTextList';
import CardForm from '../../components/CardForm';
// import Checkbox from 'material-ui/Checkbox';
import ActionType from '../../actions/ActionType';

var {
  wordsError,
  numericError,
  emailError,
} = errorMessages;

export const personFields = [
  {
    name: 'name',validations: 'isWords', validationError: wordsError,
    hintText: 'Nome do cliente', floatingLabelText: 'Nome',
  },
  {
    name: 'surname',validations: 'isWords', validationError: wordsError,
    hintText: 'Sobrenome do cliente', floatingLabelText: 'Sobrenome',
  },
  {
    name: 'cpf',validations: 'isNumeric', validationError: numericError,
    hintText: 'Apenas números', floatingLabelText: 'CPF', isUpdate: 'true'
  },
  {
    name: 'profession',validations: 'isWords', validationError: wordsError,
    hintText: 'Profissão do cliente', floatingLabelText: 'Profissão',
  },
  {
    name: 'telephone', hintText: 'Telefone do cliente',
    floatingLabelText: 'Telefone', isUpdate: 'true'
  },
  {
    name: 'email',validations: 'isEmail', validationError: emailError,
    hintText: 'E-mail do cliente', floatingLabelText: 'E-mail',
  },
  {
    name: 'hometown',validations: 'isWords', validationError: wordsError,
    hintText: 'Onde o cliente nasceu?', floatingLabelText: 'Cidade natal',
  },
];

export default class ClientForm extends Component {

  static propTypes = {
    title: PropTypes.string,
    subtitleCard: PropTypes.string,
    canSubmit: PropTypes.bool,
    data: PropTypes.object,
    isDisable: PropTypes.bool,
  }

  static defaultProps = {
    data: {},
  }

  getContentCard(){
    const formsyList = makeFormysTextList(
      personFields, 'clientform', this.props.data, this.props.isDisable
    );

    return (
      <Row around="xs">
        {formsyList}
        <Col xs={6}>
          <FormsyDate
            name="birthday"
            floatingLabelText="Data de Nascimento"
            value={this.props.data.birthday}
          />
        </Col>
        <Col xs={2}>
        </Col>
      </Row>
    );
  }

  render(){

    return (
      <SubForm
        title="Dados"
        name="active_client"
        action={ActionType.CLIENT.POSTFORM}
        canSubmit={this.props.canSubmit}
      >
        <CardForm
          titleCard={this.props.title}
          subtitleCard={this.props.subtitleCard}
          contentCard={this.getContentCard()}
        />
      </SubForm>
    );
  }
}
