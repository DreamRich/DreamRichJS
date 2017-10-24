import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import errorMessages from '../../utils/FormsErrorMessages';
import { Row, Col } from 'react-flexbox-grid';
import ClientForm from '../ClientForm';
import ClientSubForm from '../ClientSubForm';
import FormsyDate from '../../utils/formsyComponents/FormsyDate';
import PropTypes from 'prop-types';
import makeFormysTextList from '../../utils/MakeFormysTextList';
import CardForms from '../../layout/CardForms';
import Checkbox from 'material-ui/Checkbox';

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

  state = {
    sponse: false,
  }

  submit = () => {
    this.baseForm.submit();
  }

  switchSponse = () => {
    const sponse = !this.state.sponse;
    this.setState({sponse});
  }

  getContentCard(){
    const formsyList = makeFormysTextList(dataClient,'clientform');

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
  getSelectOption(selectOption,isChecked,labelOption){
    if(selectOption){
      return (
        <Checkbox
          label={labelOption}
          checked={isChecked}
          onClick={this.switchSponse}
          style={{margin: '30px 0px 30px 0px'}}
        />
      );
    }
  }

  render(){
    let subtitleCard = 'Insira as informações correspondentes as informações básicas do cônjuge.';
    let labelAdd='O cliente possui cônjuge? (Marque o quadrado ao lado caso haja).';
    let labelRemove='O cliente possui cônjuge? (Desmarque o quadrado ao lado caso não haja).';

    const sponseForm = (
      this.state.sponse ? (
        <ClientSubForm
          name="client"
          parent_name="active_client_id"
          parent_id={this.state.id}
        >
          {this.getSelectOption(this.props.selectOption, true, labelRemove)}
          <div>
            <ClientField
              title='Cônjuge'
              subtitleCard={subtitleCard}
              canSubmit={this.state.canSubmit}
              selectOption={false}
            />
          </div>
        </ClientSubForm>
      ) : (
        this.getSelectOption(this.props.selectOption, false, labelAdd)
      )
    );

    return (
      <div>
        <ClientForm ref={(ref) => {this.baseForm = ref;}} >
          <CardForms
            titleCard={this.props.title}
            subtitleCard={this.props.subtitleCard}
            contentCard={this.getContentCard()}
          />
          {sponseForm}
        </ClientForm>
      </div>
    );
  }
}

ClientField.propTypes = {
  title: PropTypes.string,
  subtitleCard: PropTypes.string,
  canSubmit: PropTypes.bool,
  selectOption: PropTypes.bool,
};
