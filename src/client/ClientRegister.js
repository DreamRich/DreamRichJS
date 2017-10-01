import React, {Component} from 'react';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText} from 'formsy-material-ui/lib';
import {FormsyDate} from '../utils/FormsyComponents';
import errorMessages from '../utils/FormsErrorMessages';
import IconButton from 'material-ui/IconButton';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
//import routeMap from '../routes/RouteMap';
//import {Auth} from '../auth/Auth';
import ClientStore from '../stores/ClientStore';
import ActionType from '../actions/ActionType';
import AppDispatcher from '../AppDispatcher';
import '../stylesheet/RegisterForms.sass';
//import PropTypes from 'prop-types';
import ClientSubForm from './ClientSubForm';

var {
  wordsError,
  numericError,
  emailError
} = errorMessages;

class ClientRegister extends Component {

  constructor(props){
    super(props);
  }

  state = {
    canSubmit: false,
  }

  componentWillMount = () => {
    this.setState({listener: ClientStore.addListener(this.handleChange)});
  }

  componentWillUnmount = () => {
    this.state.listener.remove();
  }

  handleChange = () => {
    /* This timeout is to prevent the update action launch together with
     * react dipatcher and throw error of Invariant Violation Dispatch.dispatch
     */
    setTimeout(() =>
    this.setState(ClientStore.getState()), 500);
  }

  enableButton = () => {
    this.setState({
      canSubmit: true,
    });
  }

  notifyFormError = (data) => {
    console.error('Form error:', data);
  }

  getClientsFields = () => {
    return (
      <div>
        <FormsyText
          name="name"
          validations="isWords"
          validationError={wordsError}
          hintText="Nome do cliente"
          floatingLabelText="Nome"
          value="asd"
        />
        <FormsyText
          name="surname"
          validations="isWords"
          validationError={wordsError}
          hintText="Sobrenome do cliente"
          floatingLabelText="Sobrenome"
          value="asd"
        />
        <FormsyDate
          name="birthday"
          floatingLabelText="Data de Nascimento"
        />
        <FormsyText
          name="profession"
          validations="isWords"
          validationError={wordsError}
          hintText="Profissão do cliente"
          floatingLabelText="Profissão"
          value="asd"
        />
        <FormsyText
          name="cpf"
          validations="isNumeric"
          validationError={numericError}
          hintText="Apenas números"
          floatingLabelText="CPF"
          value="33044946425"
          updateImmediately
        />
        <FormsyText
          name="telephone"
          hintText="Telefone do cliente"
          floatingLabelText="Telefone"
          value="(61) 98131-4508"
          updateImmediately
        />
        <FormsyText
          name="email"
          validations="isEmail"
          validationError={emailError}
          hintText="E-mail do cliente"
          floatingLabelText="E-mail"
          value="asd@gmail.com"
        />
        <FormsyText
          name="hometown"
          validations="isWords"
          validationError={wordsError}
          hintText="Onde o cliente nasceu?"
          floatingLabelText="Cidade natal"
          value="asdac"
        />
      </div>
    );
  }

  handleSubmit = (data) => {
    console.log(data);
    AppDispatcher.dispatch({
      actionType: ActionType.CLIENT.ACTIVE,
      data: data
    });
  }

  render() {

    return (
      <div>
        <h1> Cadastro de Cliente </h1>

        <Paper className="Paper">
          <div>
            <h2>Cliente</h2>
            <Formsy.Form
              name="active_client"
              ref={(form) => {this.baseForm = form;}}
              onValid={this.enableButton}
              onInvalidSubmit={this.notifyFormError}
              onValidSubmit={this.handleSubmit}>

              {this.getClientsFields()}

              <IconButton
                name="id_document"
                tooltip="Documento de Identificação"
                touch={true}
                tooltipPosition="top-left">
                <FileFileUpload />
              </IconButton>
              <IconButton
                name="proof_of_address"
                tooltip="Comprovante de Residência"
                touch={true}
                tooltipPosition="top-right">
                <FileFileUpload />
              </IconButton>
            </Formsy.Form>
          </div>
          <ClientSubForm
            title="Cônjuge"
            name="client"
            parent_name="active_client_id"
            parent_id={this.state.id}
          >
            {this.getClientsFields()}
          </ClientSubForm>

          <ClientSubForm
            title='Endereço'
            name='address'
            parent_name='active_client_id'
            parent_id={this.state.id}
          >
            <FormsyText
              name="cep"
              //validations="isNumeric"
              //validationError={numericError}
              hintText="Apenas números"
              floatingLabelText="CEP"
              updateImmediately
            />
            <FormsyText
              name="details"
              validations="isWords" 
              validationError={wordsError}
              hintText="Detalhes do endereço"
              floatingLabelText="Detalhes"
            />
            <FormsyText
              name="number"
              validations="isNumeric"
              validationError={numericError}
              hintText="Número do lote"
              floatingLabelText="Número"
              updateImmediately
            />
            <FormsyText
              name="complement"
              validations="isWords" 
              validationError={wordsError}
              hintText="Complemento do endereço"
              floatingLabelText="Complemento"
            />
            <FormsyText
              name="neighborhood"
              validations="isWords" 
              validationError={wordsError}
              hintText="Bairro do endereço"
              floatingLabelText="Bairro"
            />
            <FormsyText
              name="type_of_address"
              validations="isWords" 
              validationError={wordsError}
              hintText="Casa, apartamento, etc."
              floatingLabelText="Tipo de Endereço"
            />
          </ClientSubForm>
          <ClientSubForm
            title="Conta Bancária"
            name="bank_account"
            parent_name='active_client_id'
            parent_id={this.state.id}
          >
             <FormsyText
               name="agency"
               validations="isNumeric"
               validationError={numericError}
               hintText="Agência da conta bancária"
               floatingLabelText="Agência"
             />
             <FormsyText
               name="account"
               hintText="Número da conta bancária"
               floatingLabelText="Conta"
             />
          </ClientSubForm>

          <ClientSubForm
            title="Dependente"
            name="dependent"
            parent_name='active_client_id'
            parent_id={this.state.id}>
            <FormsyText
              name="name"
              validations="isWords"
              validationError={wordsError}
              hintText="Nome do dependente"
              floatingLabelText="Nome"
            />
            <FormsyText
              name="surname"
              validations="isWords"
              validationError={wordsError}
              hintText="Sobrenome do dependente"
              floatingLabelText="Sobrenome"
            />
            <FormsyDate
              name="birthday"
              floatingLabelText="Data de Nascimento"
            />
          </ClientSubForm>
          <RaisedButton
            primary
            type="submit"
            label="Enviar"
            onClick={() => this.baseForm.submit()}
            disabled={!this.state.canSubmit}
          />
        </Paper>
      </div>
    ); 
  }
}

export default ClientRegister;


//
  //const a = (
  //
  //          <div>
  //            <h2>Cônjuge</h2>
  //            <Formsy.Form
  //              name="client"
  //              ref={(form) => {this.forms.client = form;}}
  //              onValid={this.enableButton}
  //              onInvalidSubmit={this.notifyFormError}
  //              onValidSubmit={this.submitForm}>
  //              <FormsyText
  //                name="active_client_id"
  //                className="Hidden"
  //                value=""
  //              />
  //
  //              {this.getClientsFields()}
  //            </Formsy.Form>
  //          </div>
  //
  //          <div>
  //            <h2>Endereço</h2>
  //            <Formsy.Form
  //              name="address"
  //              ref={(form) => {this.forms.address = form;}}
  //              onValid={this.enableButton}
  //              onInvalidSubmit={this.notifyFormError}
  //              onValidSubmit={this.submitForm}>
  //              <FormsyText
  //                name="active_client_id"
  //                className="Hidden"
  //                value=""
  //              />
  //
  //              <FormsyText
  //                name="cep"
  //                validations="isNumeric"
  //                validationError={numericError}
  //                hintText="Apenas números"
  //                floatingLabelText="CEP"
  //                updateImmediately
  //              />
  //              <FormsyText
  //                name="details"
  //                validations="isWords" 
  //                validationError={wordsError}
  //                hintText="Detalhes do endereço"
  //                floatingLabelText="Detalhes"
  //              />
  //              <FormsyText
  //                name="number"
  //                validations="isNumeric"
  //                validationError={numericError}
  //                hintText="Número do lote"
  //                floatingLabelText="Número"
  //                updateImmediately
  //              />
  //              <FormsyText
  //                name="complement"
  //                validations="isWords" 
  //                validationError={wordsError}
  //                hintText="Complemento do endereço"
  //                floatingLabelText="Complemento"
  //              />
  //              <FormsyText
  //                name="neighborhood"
  //                validations="isWords" 
  //                validationError={wordsError}
  //                hintText="Bairro do endereço"
  //                floatingLabelText="Bairro"
  //              />
  //              <FormsyText
  //                name="type_of_address"
  //                validations="isWords" 
  //                validationError={wordsError}
  //                hintText="Casa, apartamento, etc."
  //                floatingLabelText="Tipo de Endereço"
  //              />
  //            </Formsy.Form>
  //
  //            <Formsy.Form
  //              name="state"
  //              onValid={this.enableButton}
  //              onInvalidSubmit={this.notifyFormError}
  //              onValidSubmit={this.submitForm}>
  //              <FormsyText
  //                name="active_client_id"
  //                className="Hidden"
  //                value=""
  //              />
  //
  //              <FormsyText
  //                name="name"
  //                validations="isWords"
  //                validationError={wordsError}
  //                hintText="Estado do endereço"
  //                floatingLabelText="Estado"
  //              />
  //              <FormsyText
  //                name="abbreviation"
  //                validations="isWords"
  //                validationError={wordsError}
  //                hintText="DF, RS, MG ..."
  //                floatingLabelText="Sigla do estado"
  //              />
  //            </Formsy.Form>
  //
  //            <Formsy.Form
  //              name="country"
  //              onValid={this.enableButton}
  //              onInvalidSubmit={this.notifyFormError}
  //              onValidSubmit={this.submitForm}>
  //              <FormsyText
  //                name="active_client_id"
  //                className="Hidden"
  //                value=""
  //              />
  //
  //              <FormsyText
  //                name="name"
  //                validations="isWords"
  //                validationError={wordsError}
  //                hintText="Nome do país"
  //                floatingLabelText="País"
  //              />
  //              <FormsyText
  //                name="abbreviation"
  //                validations="isWords"
  //                validationError={wordsError}
  //                hintText="BR, US ..."
  //                floatingLabelText="Sigla do país"
  //              />
  //            </Formsy.Form>
  //          </div>
  //
  //          <div>
  //            <h2>Conta Bancária</h2>
  //            <Formsy.Form
  //              name="bank_account"
  //              ref={(form) => {this.forms.bank = form;}}
  //              onValid={this.enableButton}
  //              onInvalidSubmit={this.notifyFormError}
  //              onValidSubmit={this.submitForm}>
  //              <FormsyText
  //                name="active_client_id"
  //                className="Hidden"
  //                value=""
  //              />
  //
  //              <FormsyText
  //                name="agency"
  //                validations="isNumeric"
  //                validationError={numericError}
  //                hintText="Agência da conta bancária"
  //                floatingLabelText="Agência"
  //              />
  //              <FormsyText
  //                name="account"
  //                validations="isNumeric"
  //                validationError={numericError}
  //                hintText="Número da conta bancária"
  //                floatingLabelText="Conta"
  //              />
  //            </Formsy.Form>
  //          </div>
  //
  //          <div>
  //            <h2>Dependente</h2>
  //            <Formsy.Form
  //              name="dependent"
  //              ref={(form) => {this.forms.dependent = form;}}
  //              onValid={this.enableButton}
  //              onInvalidSubmit={this.notifyFormError}
  //              onValidSubmit={this.submitForm}>
  //              <FormsyText
  //                name="active_client_id"
  //                className="Hidden"
  //                value=""
  //              />
  //
  //              <FormsyText
  //                name="name"
  //                validations="isWords"
  //                validationError={wordsError}
  //                hintText="Nome do dependente"
  //                floatingLabelText="Nome"
  //              />
  //              <FormsyText
  //                name="surname"
  //                validations="isWords"
  //                validationError={wordsError}
  //                hintText="Sobrenome do dependente"
  //                floatingLabelText="Sobrenome"
  //              />
  //              <FormsyDate
  //                name="birthday"
  //                floatingLabelText="Data de Nascimento"
  //              />
  //            </Formsy.Form>
  //          </div>);
