import React, {Component} from 'react';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText, FormsyDate} from 'formsy-material-ui/lib';
import errorMessages from '../utils/FormsErrorMessages';
import IconButton from 'material-ui/IconButton';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import '../stylesheet/RegisterForms.sass';
import routeMap from '../routes/RouteMap.js';
import {Auth} from '../auth/Auth';

class ClientRegister extends Component {

  constructor(props){
    super(props);
    this.state = {
      canSubmit: false,
    };
    this.forms = {};
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

  submitForms() {
    function submitForm(data){
      console.log('data loca', data);
      fetch(routeMap[this.name], {
        method: 'post',
        headers: Auth.getHeader(),
        body: JSON.stringify(data),
      })
      .then(() => {//console.log(this.name + ' was submitted');
      })
      .catch(() => {console.error(this.name + ' could not be submitted');});
    }
    const forms = this.forms;
    // Gambira bind na marra
    //const state = this;

    function submitBaseForm(data){
      data.birthday = data['birthday'].toISOString().slice(0, 10);
      // console.log(data.birthday);

      //console.log(JSON.stringify(data));
      fetch(routeMap[this.name], {
        method: 'post',
        headers: Auth.getHeader(),
        body: JSON.stringify(data),
      })
      .then(((response) => {
        if(response.ok) {
          //console.log(this.name + ' was submitted');
          return response.json();
        } else {
          console.error(this.name + ' could not be submitted');
        }
      }).bind(this))
      .then((data) => {
        console.log(forms);
        for (var form in forms) {
          console.log(data);
          forms[form].inputs[0].setValue(data.id);
          forms[form].submit();
        }
      })
      .catch((error) => {console.error(error);});
    }

    function partialSubmits(){
      console.log(this.base);
      this.base.submit();
    }

    var submitter = {
      submitForm: submitForm,
      partialSubmits: partialSubmits,
      submitBaseForm: submitBaseForm
    };

    return submitter;
  }


  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    let {wordsError, numericError, emailError} = errorMessages;
    let {submitForm, submitBaseForm, partialSubmits} = this.submitForms();

    return (
      <div>
        <h1> Cadastro de Cliente </h1>

        <Paper className="Paper">
          <Formsy.Form
            name="active_client"
            ref={ (form) => { this.base = form; } }
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitBaseForm}>
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
              hintText="Data de nasc. do cliente"
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
          </Formsy.Form>

          <Formsy.Form
            name="address"
            ref={ (form) => { this.forms.address = form; } }
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm}>
            <FormsyText
              name="active_client_id"
              hidden
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
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm}>
            <FormsyText
              name="active_client_id"
              hidden
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
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm}>
            <FormsyText
              name="active_client_id"
              hidden
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

          <Formsy.Form
            name="bank_account"
            ref={ (form) => { this.forms.bank = form; } }
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm}>
            <FormsyText
              name="active_client_id"
              hidden
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

          <Formsy.Form
            name="dependent"
            ref={ (form) => { this.forms.dependent = form; } }
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm}>
            <FormsyText
              name="active_client_id"
              hidden
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
              hintText="Data de nasc. do cliente"
              floatingLabelText="Data de Nascimento"
              
              
            />
          </Formsy.Form>

          <Formsy.Form
            name="client"
            ref={ (form) => { this.forms.active = form; } }
            onValid={this.enableButton.bind(this)}
            onInvalidSubmit={this.notifyFormError}
            onValidSubmit={submitForm}>
            <FormsyText
              name="active_client_id"
              hidden
              value=""
            />
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
              <FileFileUpload /> </IconButton>
            <button hidden name="partial_submit" type="submit" />
          </Formsy.Form>

          <RaisedButton
            primary
            type="submit"
            label="Enviar"
            onClick={partialSubmits.bind(this)}
            disabled={!this.state.canSubmit}
          />
        </Paper>
      </div>
    ); 
  }
}

export default ClientRegister;
