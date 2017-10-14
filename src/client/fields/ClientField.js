import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import errorMessages from '../../utils/FormsErrorMessages';
import { Row, Col } from 'react-flexbox-grid';
import ClientForm from '../ClientForm';
import {FormsyDate} from '../../utils/FormsyComponents';
import PropTypes from 'prop-types';
import makeFormysTextList from '../../utils/MakeFormysTextList';

var {
  wordsError,
  numericError,
  emailError,
} = errorMessages;

var dataClient = [
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
    floatingLabelText: 'Telefone', value: '(61 98131-4508)', isUpdate: 'true'
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

export default class ClientField extends Component {
  render(){
    const formsyList = makeFormysTextList(dataClient,'clientform');
    return (
      <Row around="xs">
        <Col xs={2}>
          <h1> {this.props.title} </h1>
        </Col>
        <Col xs={2}>
          <ClientForm ref={(ref) => {this.baseForm = ref;}} >
            {formsyList.slice(0,3)}
            <FormsyDate
              name="birthday"
              floatingLabelText="Data de Nascimento"
            />
          </ClientForm>
          <IconButton
            name="proof_of_address"
            tooltip="Comprovante de Residência"
            touch={true}
            tooltipPosition="top-right">
              <FileFileUpload />
          </IconButton>
        </Col>
        <Col xs={2}>
          <ClientForm ref={(ref) => {this.baseForm = ref;}} >
            {formsyList.slice(3,8)}
          </ClientForm>
          <IconButton
            name="id_document"
            tooltip="Documento de Identificação"
            touch={true}
            tooltipPosition="top-left">
              <FileFileUpload />
          </IconButton>
        </Col>
      </Row>
    );
  }
}
ClientField.propTypes = {
  title: PropTypes.string,
};
