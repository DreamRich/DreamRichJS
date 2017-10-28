import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
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
    hintText: 'Nome do cliente', floatingLabelText: 'Nome', value: 'asd',
  },
  {
    name: 'surname',validations: 'isWords', validationError: wordsError,
    hintText: 'Sobrenome do cliente', floatingLabelText: 'Sobrenome', value: 'asd',
  },
  {
    name: 'cpf',validations: 'isNumeric', validationError: numericError,
    hintText: 'Apenas números', floatingLabelText: 'CPF', value: '33044946425', isUpdate: 'true'
  },
  {
    name: 'profession',validations: 'isWords', validationError: wordsError,
    hintText: 'Profissão do cliente', floatingLabelText: 'Profissão', value: 'asd',
  },
  {
    name: 'telephone', hintText: 'Telefone do cliente',
    floatingLabelText: 'Telefone', value: '(61) 98131-4508', isUpdate: 'true'
  },
  {
    name: 'email',validations: 'isEmail', validationError: emailError,
    hintText: 'E-mail do cliente', floatingLabelText: 'E-mail', value: 'asd@gmail.com',
  },
  {
    name: 'hometown',validations: 'isWords', validationError: wordsError,
    hintText: 'Onde o cliente nasceu?', floatingLabelText: 'Cidade natal', value: 'asdac',
  },
];

export default class ClientForm extends Component {

  static propTypes = {
    title: PropTypes.string,
    subtitleCard: PropTypes.string,
    canSubmit: PropTypes.bool,
    client: PropTypes.object,
  }

  static defaultProps = {
    client: {},
  }

  getContentCard(){
    const formsyList = makeFormysTextList(
      personFields, 'clientform', this.props.client
    );

    return (
      <Row around="xs">
        <Col xs>
          {formsyList.slice(0,3)}
        </Col>
        <Col xs>
          {formsyList.slice(3,6)}
        </Col>
        <Col xs>
          {formsyList.slice(6,8)}
          <FormsyDate
            name="birthday"
            floatingLabelText="Data de Nascimento"
          />
          <p>
            Enviar identidade:
            <IconButton
              name="id_document"
              tooltip="Documento de Identificação"
              touch={true}
              tooltipPosition="top-left">
              <FileFileUpload />
            </IconButton>
          </p>
          <p>
            Enviar Comprovante de Residência:
            <IconButton
              name="proof_of_address"
              tooltip="Comprovante de Residência"
              touch={true}
              tooltipPosition="top-left">
              <FileFileUpload />
            </IconButton>
          </p>
        </Col>
      </Row>
    );
  }

  render(){

    return (
      <div>
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
      </div>
    );
  }
}
