import React, {Component} from 'react';
import Formsy from 'formsy-react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import {FormsyText, FormsyDate} from 'formsy-material-ui/lib';
import errorMessages from '../utils/FormsErrorMessages';
import '../stylesheet/RegisterForms.sass';

class ClientRegister extends Component{

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
              name="active_client_form"
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
              <FormsyText
                name="name"
                validations="isWords"
                validationError={wordsError}
                hintText="Qual é o seu nome?"
                floatingLabelText="Nome"
                required
              />
              <FormsyText
                name="surname"
                validations="isWords"
                validationError={wordsError}
                hintText="Qual é o seu sobrenome?"
                floatingLabelText="Sobrenome"
                required
              />
              <FormsyDate
                name="birthday"
                hintText="Data de nascimento"
                floatingLabelText="Clique para selecionar"
                required
              />
              <FormsyText
                name="profession"
                validations="isWords"
                validationError={wordsError}
                hintText="Com o que você trabalha?"
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
                hintText="Insira seu telefone"
                floatingLabelText="Telefone"
                updateImmediately
                required
              />
              <FormsyText
                name="email"
                validations="isEmail"
                validationError={emailError}
                hintText="Insira seu e-mail"
                floatingLabelText="E-mail"
                required
              />
              <FormsyText
                name="hometown"
                validations="isWords"
                validationError={wordsError}
                hintText="Onde você nasceu?"
                floatingLabelText="Cidade natal"
                required
              />
              <button hidden name="partial_submit" type="submit" />
            </Formsy.Form>

            <Formsy.Form
              name="client_form"
              onValid={this.enableButton.bind(this)}
              onInvalidSubmit={this.notifyFormError}
              onValidSubmit={submitForm.bind(this)}>
              <input
                hidden
                readOnly
                name="route"
                type="text"
                value="client/"
              / >
              <FormsyText
                name="name"
                validations="isWords"
                validationError={wordsError}
                hintText="Qual é o seu nome?"
                floatingLabelText="Nome"
                required
              />
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
