import React, {Component} from 'react';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText, FormsyDate} from 'formsy-material-ui/lib';
import errorMessages from '../utils/FormsErrorMessages';
import IconButton from 'material-ui/IconButton';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import '../stylesheet/RegisterForms.sass';

class ClientRegister extends Component {

  constructor(props){
    super(props);
    this.state = {
      canSubmit: false,
    };
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  submitAllForms() {
    var submitter = {};
    var forms = document.getElementsByTagName('form');
    var count = 0;

    function partialSubmitForms(){
      for (let count = 0; count < forms.length; ++count) {
        let current_form = forms[count];
        let buttons = current_form.getElementsByTagName('button');
        let form_name = current_form.getAttribute('name');

        for(let i = 0; i < buttons.length; ++i){

          if(buttons[i].name == 'partial_submit'){
            buttons[i].click();
            console.log(form_name  + ' was partially submitted');
            break;
          }
          else if(i == buttons.lenght - 1) {
            console.error(form_name  +
              ' doesn\'t have any button for partial submit');
          }
        }
      }
    }

    function submitForm(data) {
      let current_form = forms[count];
      let form_name = current_form.getAttribute('name');

      fetch('/api/' + current_form.route.value, {
        method: 'post',
        body: data
      })
        .then(() => {console.log(form_name + ' was submitted');})
        .catch(() => {console.error('An error occurred when submitting ' + form_name);});

      count++;
    }

    submitter = {
      submitForm : submitForm, 
      partialSubmitForms : partialSubmitForms,
    };

    return submitter;
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    let {wordsError, numericError, emailError} = errorMessages;
    let {submitForm, partialSubmitForms} = this.submitAllForms();

    return (
      <div>
        <h1> Cadastro de Cliente </h1>

        <Paper className="Paper">
          <Formsy.Form
            name="client"
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm.bind(this)}>

            <input
              name="route"
              type="text"
              value="client/"
              hidden
              readOnly
            / >
            <FormsyText
              name="name"
              validations="isWords"
              validationError={wordsError}
              hintText="Nome do cliente"
              floatingLabelText="Nome"
              required
            />
            <FormsyText
              name="surname"
              validations="isWords"
              validationError={wordsError}
              hintText="Sobrenome do cliente"
              floatingLabelText="Sobrenome"
              required
            />
            <FormsyDate
              name="birthday"
              hintText="Data de nasc. do cliente"
              floatingLabelText="Data de Nascimento"
              required
            />
            <FormsyText
              name="profession"
              validations="isWords"
              validationError={wordsError}
              hintText="Profissão do cliente"
              floatingLabelText="Profissão"
              required
            />
            <FormsyText
              name="cpf"
              validations="isNumeric"
              validationError={numericError}
              hintText="Apenas números"
              floatingLabelText="CPF"
              updateImmediately
              required
            />
            <FormsyText
              name="telephone"
              validations="isNumeric"
              validationError={numericError}
              hintText="Telefone do cliente"
              floatingLabelText="Telefone"
              updateImmediately
              required
            />
            <FormsyText
              name="email"
              validations="isEmail"
              validationError={emailError}
              hintText="E-mail do cliente"
              floatingLabelText="E-mail"
              required
            />
            <FormsyText
              name="hometown"
              validations="isWords"
              validationError={wordsError}
              hintText="Onde o cliente nasceu?"
              floatingLabelText="Cidade natal"
              required
            />
            <button hidden name="partial_submit" type="submit" />
          </Formsy.Form>

          <Formsy.Form
            name="address"
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm.bind(this)}>
            <input
              name="route"
              type="text"
              value="client/address/"
              hidden
              readOnly
            / >
            <FormsyText
              name="cep"
              validations="isNumeric"
              validationError={numericError}
              hintText="Apenas números"
              floatingLabelText="CEP"
              updateImmediately
              required
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
              required
            />
            <FormsyText
              name="complement"
              validations="isWords" 
              validationError={wordsError}
              hintText="Complemento do endereço"
              floatingLabelText="Complemento"
              required
            />
            <FormsyText
              name="neighborhood"
              validations="isWords" 
              validationError={wordsError}
              hintText="Bairro do endereço"
              floatingLabelText="Bairro"
              required
            />
            <FormsyText
              name="type_of_address"
              validations="isWords" 
              validationError={wordsError}
              hintText="Casa, apartamento, etc."
              floatingLabelText="Tipo de Endereço"
              required
            />
            <button hidden name="partial_submit" type="submit" />
          </Formsy.Form>

          <Formsy.Form
            name="state"
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm.bind(this)}>
            <input
              name="route"
              type="text"
              value="client/state/"
              hidden
              readOnly
            / >
            <FormsyText
              name="name"
              validations="isWords"
              validationError={wordsError}
              hintText="Estado do endereço"
              floatingLabelText="Estado"
              required
            />
            <FormsyText
              name="abbreviation"
              validations="isWords"
              validationError={wordsError}
              hintText="DF, RS, MG ..."
              floatingLabelText="Sigla do estado"
              required
            />
            <button hidden name="partial_submit" type="submit" />
          </Formsy.Form>

          <Formsy.Form
            name="country"
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm.bind(this)}>
            <input
              name="route"
              type="text"
              value="client/country/"
              hidden
              readOnly
            / >
            <FormsyText
              name="name"
              validations="isWords"
              validationError={wordsError}
              hintText="Nome do país"
              floatingLabelText="País"
              required
            />
            <FormsyText
              name="abbreviation"
              validations="isWords"
              validationError={wordsError}
              hintText="BR, US ..."
              floatingLabelText="Sigla do país"
              required
            />
            <button hidden name="partial_submit" type="submit" />
          </Formsy.Form>

          <Formsy.Form
            name="bank_account"
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm.bind(this)}>
            <input
              name="route"
              hidden
              readOnly
              type="text"
              value="client/bank-account/"
            / >
            <FormsyText
              name="name"
              validations="isNumeric"
              validationError={numericError}
              hintText="Agência da conta bancária"
              floatingLabelText="Agência"
              required
            />
            <FormsyText
              name="account"
              validations="isNumeric"
              validationError={numericError}
              hintText="Número da conta bancária"
              floatingLabelText="Conta"
              required
            />
            <button hidden name="partial_submit" type="submit" />
          </Formsy.Form>

          <Formsy.Form
            name="dependent"
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm.bind(this)}>
            <input
              name="route"
              type="text"
              value="client/dependent/"
              hidden
              readOnly
            / >
            <FormsyText
              name="name"
              validations="isWords"
              validationError={wordsError}
              hintText="Nome do dependente"
              floatingLabelText="Nome"
              required
            />
            <FormsyText
              name="surname"
              validations="isWords"
              validationError={wordsError}
              hintText="Sobrenome do dependente"
              floatingLabelText="Sobrenome"
              required
            />
            <FormsyDate
              name="birthday"
              hintText="Data de nasc. do cliente"
              floatingLabelText="Data de Nascimento"
              required
            />
            <button hidden name="partial_submit" type="submit" />
          </Formsy.Form>

          <Formsy.Form
            name="active_client"
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm.bind(this)}>
            <input
              hidden
              readOnly
              name="route"
              type="text"
              value="client/active/"
            / >
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
            <button hidden name="partial_submit" type="submit" />
          </Formsy.Form>

          <RaisedButton
            primary
            type="submit"
            label="Enviar"
            onClick={partialSubmitForms.bind(this)}
            disabled={!this.state.canSubmit}
          />
        </Paper>
      </div>
    ); 
  }
}

export default ClientRegister;
