import React, {Component} from 'react';
import errorMessages from '../../utils/FormsErrorMessages';
import { Row, Col } from 'react-flexbox-grid';
import SubForm from '../../components/SubForm';
import FormsyDate from '../../utils/formsyComponents/FormsyDate';
import PropTypes from 'prop-types';
import makeFormysTextList from '../../utils/MakeFormysTextList';
import CardForm from '../../components/CardForm';
import MediaQuery from 'react-responsive';
import UploadFileModal from '../../components/UploadFileModal';
import ActionType from '../../actions/ActionType';
import RaisedButton from 'material-ui/RaisedButton';
import getElementCentered from '../../utils/getElementCentered';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/image/edit';

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

  constructor(props){
    super(props);

    this.state = {
      isDisable: this.props.isDisable,
    };

    this.changeStateDisable = this.changeStateDisable.bind(this);
  }

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

  changeStateDisable(){
    this.setState({isDisable: !this.state.isDisable});
  }

  getFormsyDate(){
    return (
      <FormsyDate
        name="birthday"
        floatingLabelText="Data de Nascimento"
        value={this.props.data.birthday}
        isFormDisabled={this.state.isDisable}
      />
    );
  }

  getUploadFileModal(){
    if(!this.state.isDisable){
      return (
        <UploadFileModal />
      );
    }
  }

  getContentCard(){
    const formsyList = makeFormysTextList(
      personFields, 'clientform', this.props.data, this.state.isDisable
    );

    return (
      <div>
        <MediaQuery key="desktopClientForm" query="(min-width: 1030px)">
          {this.state.isDisable && getElementCentered(
            <IconButton tooltip="Editar formulário" tooltipPosition="top-center">
              <Edit
                onClick={this.changeStateDisable}
              />
            </IconButton>
          )}
          <Row around="xs">
            <Col key="firstColumnClientForm" xs>
              {formsyList.slice(0,3)}
            </Col>
            <Col key="secondColumnClientForm" xs>
              {formsyList.slice(3,6)}
            </Col>
            <Col key="thirdColumnClientForm" xs>
              {formsyList.slice(6,8)}
              {this.getFormsyDate()}
              {this.getUploadFileModal()}
            </Col>
          </Row>
          {!this.state.isDisable && getElementCentered(
            <RaisedButton
              label="Salvar"
              onClick={this.changeStateDisable}
              primary={true}
            />)
          }
        </MediaQuery>
        <MediaQuery key="mobileClientForm" query="(max-width: 1030px)">
          {this.state.isDisable && getElementCentered(
            <IconButton tooltip="Editar formulário" tooltipPosition="top-center">
              <Edit
                onClick={this.changeStateDisable}
              />
            </IconButton>
          )}
          {formsyList}
          {this.getFormsyDate()}
          {!this.state.isDisable && getElementCentered(
            <RaisedButton
              label="Salvar"
              onClick={this.changeStateDisable}
              primary={true}
            />)
          }
        </MediaQuery>
      </div>
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
