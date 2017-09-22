import React, {Component} from 'react';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText} from 'formsy-material-ui/lib';
import {FormsyDate} from '../utils/FormsyComponents.js';
import errorMessages from '../utils/FormsErrorMessages';
import IconButton from 'material-ui/IconButton';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import {routeMap} from '../routes/RouteMap.js';
import {Auth} from '../auth/Auth';
import '../stylesheet/RegisterForms.sass';

var {
  wordsError,
  numericError,
  emailError
} = errorMessages;

class ClientRegister extends Component {

  constructor(props){
    super(props);
    this.forms = {};

    let formsFunctions = this.submitForms();
    this.submitForm = formsFunctions.submitForm;
    this.submitBaseForm = formsFunctions.submitBaseForm;
    this.callBaseSubmit = formsFunctions.callBaseSubmit;
  }

  state = {
    canSubmit: false,
  }

  enableButton = () => {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false,
    });
  }

  notifyFormError = (data) => {
    console.error('Form error:', data);
  }

  submitForms = () => {

    function submitForm(data){
      fetch(routeMap[this.name], {
        method: 'post',
        headers: Auth.getHeader(),
        body: JSON.stringify(data),
      })
      .then((response) => {
        if(response.ok) {
          console.log(this.name + ' was submitted');
        } else {
          throw new Error (this.name + ' could not be submitted');
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
    }

    var that = this;

    function submitBaseForm(data){
      fetch(routeMap[this.name], {
        method: 'post',
        headers: Auth.getHeader(),
        body: JSON.stringify(data),
      })
      .then(((response) => {
        var data = {};

        if(response.ok) {
          console.log(this.name + ' was submitted');
          data = response.json();
        } else {
          throw new Error (this.name + ' could not be submitted');
        }
        return data;
      }))
      .then((data) => {
        for (var form in that.forms) {
          that.forms[form].inputs[0].setValue(data.id);
          that.forms[form].submit();
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
    }

    function callBaseSubmit(){
      that.baseForm.submit();
    }

    var submitter = {
      submitForm: submitForm,
      callBaseSubmit: callBaseSubmit,
      submitBaseForm: submitBaseForm
    };

    return submitter;
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
          validations="isNumeric"
          validationError={numericError}
          hintText="Telefone do cliente"
          floatingLabelText="Telefone"
          value="111"
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
              onValidSubmit={this.submitBaseForm}>

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

          <div>
            <h2>Cônjuge</h2>
            <Formsy.Form
              name="client"
              ref={(form) => {this.forms.client = form;}}
              onValid={this.enableButton}
              onInvalidSubmit={this.notifyFormError}
              onValidSubmit={this.submitForm}>
              <FormsyText
                name="active_client_id"
                className="Hidden"
                value=""
              />

              {this.getClientsFields()}
            </Formsy.Form>
          </div>

          <div>
            <h2>Endereço</h2>
            <Formsy.Form
              name="address"
              ref={(form) => {this.forms.address = form;}}
              onValid={this.enableButton}
              onInvalidSubmit={this.notifyFormError}
              onValidSubmit={this.submitForm}>
              <FormsyText
                name="active_client_id"
                className="Hidden"
                value=""
              />

              <FormsyText
                name="cep"
                validations="isNumeric"
                validationError={numericError}
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
            </Formsy.Form>

            <Formsy.Form
              name="state"
              onValid={this.enableButton}
              onInvalidSubmit={this.notifyFormError}
              onValidSubmit={this.submitForm}>
              <FormsyText
                name="active_client_id"
                className="Hidden"
                value=""
              />

              <FormsyText
                name="name"
                validations="isWords"
                validationError={wordsError}
                hintText="Estado do endereço"
                floatingLabelText="Estado"
              />
              <FormsyText
                name="abbreviation"
                validations="isWords"
                validationError={wordsError}
                hintText="DF, RS, MG ..."
                floatingLabelText="Sigla do estado"
              />
            </Formsy.Form>

            <Formsy.Form
              name="country"
              onValid={this.enableButton}
              onInvalidSubmit={this.notifyFormError}
              onValidSubmit={this.submitForm}>
              <FormsyText
                name="active_client_id"
                className="Hidden"
                value=""
              />

              <FormsyText
                name="name"
                validations="isWords"
                validationError={wordsError}
                hintText="Nome do país"
                floatingLabelText="País"
              />
              <FormsyText
                name="abbreviation"
                validations="isWords"
                validationError={wordsError}
                hintText="BR, US ..."
                floatingLabelText="Sigla do país"
              />
            </Formsy.Form>
          </div>

          <div>
            <h2>Conta Bancária</h2>
            <Formsy.Form
              name="bank_account"
              ref={(form) => {this.forms.bank = form;}}
              onValid={this.enableButton}
              onInvalidSubmit={this.notifyFormError}
              onValidSubmit={this.submitForm}>
              <FormsyText
                name="active_client_id"
                className="Hidden"
                value=""
              />

              <FormsyText
                name="agency"
                validations="isNumeric"
                validationError={numericError}
                hintText="Agência da conta bancária"
                floatingLabelText="Agência"
              />
              <FormsyText
                name="account"
                validations="isNumeric"
                validationError={numericError}
                hintText="Número da conta bancária"
                floatingLabelText="Conta"
              />
            </Formsy.Form>
          </div>

          <div>
            <h2>Dependente</h2>
            <Formsy.Form
              name="dependent"
              ref={(form) => {this.forms.dependent = form;}}
              onValid={this.enableButton}
              onInvalidSubmit={this.notifyFormError}
              onValidSubmit={this.submitForm}>
              <FormsyText
                name="active_client_id"
                className="Hidden"
                value=""
              />

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
            </Formsy.Form>
          </div>

          <RaisedButton
            primary
            type="submit"
            label="Enviar"
            onClick={this.callBaseSubmit}
            disabled={!this.state.canSubmit}
          />
        </Paper>
      </div>
    ); 
  }
}

export default ClientRegister;
